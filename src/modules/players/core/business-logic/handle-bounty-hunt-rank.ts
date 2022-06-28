import { BountyHuntRanking } from '@modules/players/domain/entities/bounty-hunt-ranking';
import { IBountyHuntRankingRepository } from '@modules/players/domain/repositories/bounty-hunt-ranking-repository';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { Either, left, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { InvalidActiveShipError } from './errors/invalid-active-ship-error';
import { InvalidShipFuelError } from './errors/invalid-ship-fuel-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { ResourceNotFoundError } from './errors/resource-not-fount-error';
import { ShipNotFoundError } from './errors/ship-not-fount-error';

type HandleBountyHuntRankResponse = Either<
  PlayerNotFoundError | ResourceNotFoundError,
  null
>;

export type HandleBountyHuntRankRequestDTO = {
  playerId: string;
  points: number;
};

@injectable()
class HandleBountyHuntRankBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('BountyHuntRankingRepository')
    private bountyHuntRankingRepository: IBountyHuntRankingRepository,
  ) {}

  async execute({
    playerId,
    points,
  }: HandleBountyHuntRankRequestDTO): Promise<HandleBountyHuntRankResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const bountyHuntRanking =
      await this.bountyHuntRankingRepository.findBountyHuntRankingByPlayerId(
        playerId,
      );

    if (!player.activeShipId) {
      return left(new InvalidActiveShipError());
    }

    if (!bountyHuntRanking) {
      const { bountyHuntRanking: _bountyHuntRanking } = new BountyHuntRanking({
        maxPoints: points,
        playerId,
      });

      await this.bountyHuntRankingRepository.create(_bountyHuntRanking);

      return right(null);
    }

    if (points > bountyHuntRanking.maxPoints) {
      bountyHuntRanking.maxPoints = points;

      await this.bountyHuntRankingRepository.save(bountyHuntRanking);
    }

    return right(null);
  }
}

export { HandleBountyHuntRankBusinessLogic };
