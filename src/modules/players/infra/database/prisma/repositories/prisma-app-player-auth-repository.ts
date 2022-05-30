import {
  IPlayerAuth,
  PlayerAuth,
} from '@modules/players/domain/entities/player-auth';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { PlayerAuth as PrismaPlayerAuth } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parsePlayerAuth = (player_auth: PrismaPlayerAuth): IPlayerAuth => {
  return new PlayerAuth(player_auth, {
    id: player_auth.id,
    createdAt: player_auth.createdAt,
    updatedAt: player_auth.updatedAt,
  }).playerAuth;
};

export class PrismaAppPlayerAuthRepository implements IAppPlayerAuthRepository {
  async create(player_auth: IPlayerAuth): Promise<void> {
    const { id: player_auth_id, ...props } = player_auth;

    await prisma.playerAuth.create({
      data: {
        id: player_auth_id,
        ...props,
      },
    });
  }

  async destroy(player_auth_id: string): Promise<void> {
    await prisma.playerAuth.delete({
      where: {
        id: player_auth_id,
      },
    });
  }

  async update(player_auth: IPlayerAuth): Promise<void> {
    const { id: player_auth_id, ...props } = player_auth;

    await prisma.playerAuth.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: player_auth_id,
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

  async findFirstByPlayerId(player_id: string): AsyncMaybe<IPlayerAuth> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        playerId: player_id,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findByPlayerIdAndPayload(
    player_id: string,
    payload: string,
  ): AsyncMaybe<IPlayerAuth> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        playerId: player_id,
        payload,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findManyByPlayerId(player_id: string): Promise<IPlayerAuth[]> {
    const playerAuth = await prisma.playerAuth.findMany({
      where: {
        playerId: player_id,
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
