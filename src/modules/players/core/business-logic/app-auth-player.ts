import { IPlayer } from '@modules/players/domain/entities/player';
import {
  IPlayerAuth,
  PlayerAuth,
} from '@modules/players/domain/entities/player-auth';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { AppPlayerAuthRequestDTO } from '../../dtos/auth-player-request';

type AppPlayerAuthResponse = {
  player: IPlayer;
  token: IPlayerAuth;
};

@injectable()
export class AppPlayerAuthBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('AppPlayerAuthRepository')
    private appPlayerAuth: IAppPlayerAuthRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    email,
    password,
  }: AppPlayerAuthRequestDTO): Promise<AppPlayerAuthResponse> {
    const player = await this.playersRepository.findByEmail(email);

    if (!player) {
      throw new AppError('Player does not exist', 403);
    }

    const passwordVerified = await this.hashProvider.compareHash(
      password,
      player.password,
    );

    if (!passwordVerified) {
      throw new AppError('Password invalid', 403);
    }

    const today = new Date();
    const oneDay = today.getTime() + 1000 * 60 * 60 * 24;
    const tomorrowDate = new Date(oneDay);

    const domainPlayerAuth = new PlayerAuth({
      isLogged: true,
      isValidToken: true,
      playerId: player.id,
      expireIn: tomorrowDate,
      payload: '',
    });

    const payload = this.tokenProvider.generate(domainPlayerAuth.playerAuth);

    domainPlayerAuth.assign = {
      payload,
    };

    const playersAuth = await this.appPlayerAuth.findManyByPlayerId(player.id);

    await Promise.all(
      playersAuth.map(async player_auth => {
        const isTokenExpired = this.dateProvider.isAfter(
          today,
          player_auth.expireIn,
        );

        if (isTokenExpired) {
          await this.appPlayerAuth.destroy(player_auth.id);
        }
      }),
    );

    await this.appPlayerAuth.create(domainPlayerAuth.playerAuth);

    const token = domainPlayerAuth.playerAuth;

    if (!token) {
      throw new AppError('Unable to create a token');
    }

    return {
      player,
      token,
    };
  }
}
