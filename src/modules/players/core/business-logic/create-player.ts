import { IPlayer, Player } from '@modules/players/domain/entities/player';
import {
  IPlayerAuth,
  PlayerAuth,
} from '@modules/players/domain/entities/player-auth';
import { Resource } from '@modules/players/domain/entities/resource';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { CreatePlayerRequestDTO } from '@modules/players/dtos/create-player-request';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

type Response = {
  player: IPlayer;
  token: IPlayerAuth;
};

@injectable()
class CreatePlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('AppPlayerAuthRepository')
    private appPlayerAuthRepository: IAppPlayerAuthRepository,
  ) {}

  async execute({
    email,
    nickname,
    role = PlayerRole.DEFAULT,
    password,
  }: CreatePlayerRequestDTO): Promise<Response> {
    const foundPlayer = await this.playersRepository.findByEmail(email);

    if (foundPlayer) {
      throw new AppError('Unable to create player', 400);
    }

    const checkNicknameAlreadyExists =
      await this.playersRepository.findByNickname(nickname);

    if (checkNicknameAlreadyExists) {
      throw new AppError('Nickname entered already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const { player } = new Player({
      email,
      nickname,
      role,
      wallet: null,
      password: hashedPassword,
      hasAsteroid: false,
      isEnabled: true,
      activeShipId: null,
      isBanned: false,
    });

    await this.playersRepository.create(player);

    const { resource } = new Resource({
      iron: 0,
      playerId: player.id,
      science: 0,
      scrap: 0,
      spc: 0,
      copper: 0,
      gold: 0,
    });

    await this.resourcesRepository.create(resource);

    const expireIn = this.dateProvider.addHours(new Date(), 24);

    const domainPlayerAuth = new PlayerAuth({
      isLogged: true,
      isValidToken: true,
      playerId: player.id,
      expireIn,
      payload: '',
    });

    const payload = this.tokenProvider.generate(domainPlayerAuth.playerAuth);

    domainPlayerAuth.assign = {
      payload,
    };

    await this.appPlayerAuthRepository.create(domainPlayerAuth.playerAuth);

    return {
      player,
      token: domainPlayerAuth.playerAuth,
    };
  }
}

export { CreatePlayerBusinessLogic };
