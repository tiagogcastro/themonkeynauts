import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

type ShowPlayerRequestDTO = {
  nickname?: string;
  player_id?: string;
};

type Response = {
  player: IPlayer;
};

@injectable()
class ShowPlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    nickname,
    player_id,
  }: ShowPlayerRequestDTO): Promise<Response> {
    if (player_id) {
      const player = await this.playersRepository.findById(player_id);

      if (!player) {
        throw new AppError('Could not show player', 401);
      }

      return {
        player,
      };
    }

    const player = await this.playersRepository.findByNickname(
      nickname as string,
    );

    if (!player) {
      throw new AppError('Could not show player', 401);
    }

    return {
      player,
    };
  }
}

export { ShowPlayerBusinessLogic };
