import { inject, injectable, TokenProvider } from 'tsyringe';

import { Player } from '@modules/players/domain/entities/player';
import { PlayerAuth } from '@modules/players/domain/entities/player-auth';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';

import { IHashProvider } from '@shared/domain/providers/hash-provider';

import { AppError } from '@shared/errors/app-error';

import { AppPlayerAuthRequestDTO } from '../dtos/auth-player-request';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { ITokenProvider } from '@shared/domain/providers/token-provider';

interface AppPlayerAuthResponse {
  player: Player;
  token: PlayerAuth;
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
  ) {}

  async execute({ email, password }: AppPlayerAuthRequestDTO): Promise<AppPlayerAuthResponse> {
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
    const oneDay = today.getTime() + (1000 * 60 * 60 * 24);
    const tomorrowDate = new Date(oneDay);

    const authPlayer = new PlayerAuth({
      isLogged: true,
      isValidToken: true,
      playerId: player.id,
      expireIn: tomorrowDate
    });

    const payload = this.tokenProvider.generate(authPlayer);

    authPlayer.payload = payload

    // TODO - CORRECT A BUG
    // adicionar algo que busque o usuario em especifico e atualizar o payload,
    // caso não exista o usuario, crie. (atualmente faz isso, porém ta dando error)
    // o usuario poderá ter varios registros, desde que acesse o app de pc diferente(estou pensando em usar o USER IP)

    const foundAuthPlayer = await this.appPlayerAuth.findFirstByPlayerId(player.id);

    if(foundAuthPlayer) {
      const token = await this.appPlayerAuth.update(authPlayer);

      if(!token) {
        throw new AppError('Unable to create a new token')
      }
    
      return {
        player,
        token,
      };
    }

    const token = await this.appPlayerAuth.create(authPlayer);

    if(!token) {
      throw new AppError('Unable to create a token')
    }

    return {
      player,
      token,
    };
  }
}
