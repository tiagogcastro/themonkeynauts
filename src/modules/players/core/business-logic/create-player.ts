import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';

import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { AppError } from '@shared/errors/app-error';

import { CreatePlayerRequestDTO } from '@modules/players/core/dtos/create-player-request';

import { Player } from '@modules/players/domain/entities/player';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { PlayersRepository } from '@modules/players/infra/database/prisma/repositories/players-repository';
import { BCryptHashProvider } from '@shared/infra/providers/bcrypt-hash-provider';

type Response = {
  player: Player;
}

class CreatePlayerBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
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

    const player = await this.playersRepository.create({
      email,
      nickname,
      role,
      password: hashedPassword,
    });

    return {
      player
    };
  }
}

const playersRepository = new PlayersRepository;
const hashProvider = new BCryptHashProvider;

const createPlayerBusinessLogic = new CreatePlayerBusinessLogic(playersRepository., hashProvider);

export { CreatePlayerBusinessLogic };
