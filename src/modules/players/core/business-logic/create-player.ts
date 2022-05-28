import { commons } from '@shared/helpers/commons';
import { CreatePlayerRequestDTO } from '@modules/players/core/dtos/create-player-request';
import { Player } from '@modules/players/domain/entities/player';
import { Resource } from '@modules/players/domain/entities/resource';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';

type Response = {
  player: Player;
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
      await this.playersRepository.findByNickname(nickname, false);

    if (checkNicknameAlreadyExists) {
      throw new AppError('Nickname entered already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const player = new Player({
      email,
      nickname,
      role,
      wallet: null,
      password: hashedPassword,
      canBountyHunt: true,
      hasAsteroid: false,
      enabled: true,
      ...commons(),
    });

    await this.playersRepository.create(player);

    const resource = new Resource({
      iron: 0,
      playerId: player.id,
      science: 0,
      scrap: 0,
      spc: 0,
      copper: 0,
      gold: 0,
      ...commons(),
    });

    await this.resourcesRepository.create(resource);

    return {
      player,
    };
  }
}

export { CreatePlayerBusinessLogic };
