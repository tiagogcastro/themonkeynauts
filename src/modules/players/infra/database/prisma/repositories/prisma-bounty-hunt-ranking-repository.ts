import { BountyHuntRanking as PrismaBountyHuntRanking } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IBountyHuntRankingRepository } from '@modules/players/domain/repositories/bounty-hunt-ranking-repository';
import {
  BountyHuntRanking,
  IBountyHuntRanking,
} from '@modules/players/domain/entities/bounty-hunt-ranking';

const parseBountyHuntRanking = (
  bountyHuntRanking: PrismaBountyHuntRanking,
): IBountyHuntRanking => {
  return new BountyHuntRanking(bountyHuntRanking, {
    id: bountyHuntRanking.id,
    createdAt: bountyHuntRanking.createdAt,
    updatedAt: bountyHuntRanking.updatedAt,
  }).bountyHuntRanking;
};

export class PrismaBountyHuntRankingRepository
  implements IBountyHuntRankingRepository
{
  async create(bountyHuntRanking: BountyHuntRanking): Promise<void> {
    await prisma.bountyHuntRanking.create({
      data: bountyHuntRanking,
    });
  }

  async save({
    id: bountyHuntRankingId,
    ...bountyHuntRanking
  }: BountyHuntRanking): Promise<void> {
    await prisma.bountyHuntRanking.update({
      data: bountyHuntRanking,
      where: {
        id: bountyHuntRankingId,
      },
    });
  }

  async findBountyHuntRankingByPlayerId(
    playerId: string,
  ): AsyncMaybe<IBountyHuntRanking> {
    const bountyHuntRanking = await prisma.bountyHuntRanking.findUnique({
      where: {
        playerId,
      },
    });

    if (!bountyHuntRanking) {
      return null;
    }

    return parseBountyHuntRanking(bountyHuntRanking);
  }
}
