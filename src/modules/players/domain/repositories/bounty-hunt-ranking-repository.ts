import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IBountyHuntRanking } from '../entities/bounty-hunt-ranking';

export interface IBountyHuntRankingRepository {
  create(bountyHuntRanking: IBountyHuntRanking): Promise<void>;
  save(bountyHuntRanking: IBountyHuntRanking): Promise<void>;
  findBountyHuntRankingByPlayerId(
    playerId: string,
  ): AsyncMaybe<IBountyHuntRanking>;
}
