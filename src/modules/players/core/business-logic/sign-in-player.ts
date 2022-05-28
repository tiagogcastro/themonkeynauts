import { Player } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

type SignInRequestDTO = {
  email: string;
  password: string;
};

type Response = {
  player: Player;
  token: string;
};

@injectable()
export class SignInPlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: SignInRequestDTO): Promise<Response> {
    const player = await this.playersRepository.findByEmail(email);

    if (!player) {
      throw new AppError('Player does not exist', 403);
    }

    const passwordVerified = await this.hashProvider.compareHash(
      password,
      player.password,
    );

    if (!passwordVerified) {
      throw new AppError('Password invalid');
    }

    const token = this.tokenProvider.generate(player);

    return {
      player,
      token,
    };
  }
}
