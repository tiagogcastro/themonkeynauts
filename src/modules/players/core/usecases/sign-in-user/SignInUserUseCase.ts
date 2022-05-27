import { IPlayersRepository } from '../../repositories/IPlayersRepository';

import { AppError } from '../../../../shared/errors/AppError';


import { JWTokenProvider } from '../../../../shared/providers/implementations/JWTokenProvider';
import { compare } from 'bcrypt';
import { Player } from '@prisma/client';
import { IHashProvider } from '../../../../shared/providers/IHashProvider';
import { ITokenProvider } from '../../../../shared/providers/ITokenProvider';

type SignInRequestDTO = {
  email: string;
  password: string;
}

type Response = {
  player: Player;
  token: string;
}

export class SignInBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
    private tokenProvider: ITokenProvider,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    password,
  }: SignInRequestDTO): Promise<Response> {
    const player = await this.playersRepository.findByEmail(
      email,
    );

    if (!player) {
      throw new AppError('Player does not exist', 403);
    }

    const passwordVerified = await this.hashProvider.compareHash(password, player.password);

    if (password && password.length < 6) {
      throw new AppError('Password must be at least 6 digits', 401);
    }

    if (!passwordVerified) {
      throw new AppError('Password invalid');
    }

    const token = this.tokenProvider.generate(player);

    return {
      player,
      token
    };
  }
}
