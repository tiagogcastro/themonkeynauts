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
    // disabled players are invisible to findById, so the toggle must
    // look them up without the isEnabled filter to be able to re-enable
    const player =
      await this.playersRepository.findByIdIncludingDisabled(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    player.isEnabled = !player.isEnabled;

    await this.playersRepository.save(player);

    return right(player);
  }
}

export { DisableEnablePlayerBusinessLogic };
