import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, left, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { PlayerNotFoundError } from './errors/player-not-fount-error';

type DisableEnablePlayerResponse = Either<PlayerNotFoundError, IPlayer>;

export type DisableEnablePlayerRequestDTO = {
  playerId: string;
};

@injectable()
class DisableEnablePlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute(playerId: string): Promise<DisableEnablePlayerResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    player.isEnabled = !player.isEnabled;

    return right(player);
  }
}

export { DisableEnablePlayerBusinessLogic };
