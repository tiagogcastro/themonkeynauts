import {
  IPlayerAuth,
  PlayerAuth,
} from '@modules/players/domain/entities/player-auth';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { PlayerAuth as PrismaPlayerAuth } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

const parsePlayerAuth = (playerAuth: PrismaPlayerAuth): IPlayerAuth => {
  return new PlayerAuth(playerAuth, {
    id: playerAuth.id,
    createdAt: playerAuth.createdAt,
    updatedAt: playerAuth.updatedAt,
  }).playerAuth;
};

export class PrismaAppPlayerAuthRepository implements IAppPlayerAuthRepository {
  async create(playerAuth: IPlayerAuth): Promise<void> {
    const { id: playerAuthId, ...props } = playerAuth;

    await prisma.playerAuth.create({
      data: {
        id: playerAuthId,
        ...props,
      },
    });
  }

  async destroy(playerAuthId: string): Promise<void> {
    await prisma.playerAuth.delete({
      where: {
        id: playerAuthId,
      },
    });
  }

  async update(playerAuth: IPlayerAuth): Promise<void> {
    const { id: playerAuthId, ...props } = playerAuth;

    await prisma.playerAuth.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: playerAuthId,
      },
    });
  }

  async findUniqueByPayload(payload: string): AsyncMaybe<IPlayerAuth> {
    const playerAuth = await prisma.playerAuth.findUnique({
      where: {
        payload,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findById(id: string): AsyncMaybe<IPlayerAuth> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        id,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findFirstByPlayerId(playerId: string): AsyncMaybe<IPlayerAuth> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        playerId,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findByPlayerIdAndPayload(
    playerId: string,
    payload: string,
  ): AsyncMaybe<IPlayerAuth> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        playerId,
        payload,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findManyByPlayerId(playerId: string): Promise<IPlayerAuth[]> {
    const playerAuth = await prisma.playerAuth.findMany({
      where: {
        playerId,
      },
    });

    return playerAuth.map(parsePlayerAuth);
  }

  async verifyIsValidToken(payload: string): Promise<boolean> {
    const foundPlayerAuth = await prisma.playerAuth.findUnique({
      where: {
        payload,
      },
    });

    if (foundPlayerAuth?.isValidToken) {
      return true;
    }

    return false;
  }
}
