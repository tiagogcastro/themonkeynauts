import { InitBountyHuntToken as PrismaInitBountyHuntToken } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IInitBountyHuntTokenRepository } from '@modules/players/domain/repositories/init-bounty-hunt-token-repository';
import {
  InitBountyHuntToken,
  IInitBountyHuntToken,
} from '@modules/players/domain/entities/init-bounty-hunt-token';

const parseInitBountyHuntToken = (
  initBountyHuntToken: PrismaInitBountyHuntToken,
): IInitBountyHuntToken => {
  return new InitBountyHuntToken(initBountyHuntToken, {
    id: initBountyHuntToken.id,
    createdAt: initBountyHuntToken.createdAt,
    updatedAt: initBountyHuntToken.updatedAt,
  }).initBountyHuntToken;
};

export class PrismaInitBountyHuntTokenRepository
  implements IInitBountyHuntTokenRepository
{
  async create(initBountyHuntToken: InitBountyHuntToken): Promise<void> {
    await prisma.initBountyHuntToken.create({
      data: initBountyHuntToken,
    });
  }

  async save({
    id: initBountyHuntTokenId,
    ...initBountyHuntToken
  }: InitBountyHuntToken): Promise<void> {
    await prisma.initBountyHuntToken.update({
      data: initBountyHuntToken,
      where: {
        id: initBountyHuntTokenId,
      },
    });
  }

  async destroy(initBountyHuntTokenId: string): Promise<void> {
    await prisma.initBountyHuntToken.delete({
      where: {
        id: initBountyHuntTokenId,
      },
    });
  }

  async update(initBountyHuntToken: InitBountyHuntToken): Promise<void> {
    await prisma.initBountyHuntToken.update({
      data: initBountyHuntToken,
      where: {
        playerId: initBountyHuntToken.playerId,
      },
    });
  }

  async findInitBountyHuntTokenByPlayerId(
    playerId: string,
  ): AsyncMaybe<IInitBountyHuntToken> {
    const initBountyHuntToken = await prisma.initBountyHuntToken.findUnique({
      where: {
        playerId,
      },
    });

    if (!initBountyHuntToken) {
      return null;
    }

    return parseInitBountyHuntToken(initBountyHuntToken);
  }
}
