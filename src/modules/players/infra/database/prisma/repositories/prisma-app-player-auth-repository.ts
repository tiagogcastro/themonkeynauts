import { PlayerAuth as PrismaPlayerAuth } from '@prisma/client';

import { PlayerAuth } from '@modules/players/domain/entities/player-auth';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';

import { prisma } from '@shared/infra/database/prisma/client';

const parsePlayerAuth = (player_auth: PrismaPlayerAuth): PlayerAuth => {
  return new PlayerAuth(player_auth, {
    id: player_auth.id,
  });
};

export class PrismaAppPlayerAuthRepository implements IAppPlayerAuthRepository {
  async create(player_auth: PlayerAuth): Promise<PlayerAuth> {
    return prisma.playerAuth.create({
      data: player_auth
    });
  }

  async destroy(player_auth_id: string): Promise<void> {
    await prisma.playerAuth.delete({
      where: {
        id: player_auth_id,
      },
    });
  }

  async update(player_auth: PlayerAuth): Promise<PlayerAuth> {
    const {
      id,
      isLogged,
      updatedAt,
      payload,
      isValidToken,
      playerId,
    } = player_auth;

    return prisma.playerAuth.update({
      data: {
        isLogged,
        updatedAt,
        payload,
        isValidToken,
        playerId,
      },
      where: {
        id
      }
    });
  }

  async findUniqueByPayload(payload: string): Promise<PlayerAuth | null> {
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

  async findById(id: string): Promise<PlayerAuth | null> {
    const playerAuth = await prisma.playerAuth.findUnique({
      where: {
        id,
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findFirstByPlayerId(player_id: string): Promise<PlayerAuth | null> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        playerId: player_id
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findByPlayerIdAndPayload(player_id: string, payload: string): Promise<PlayerAuth | null> {
    const playerAuth = await prisma.playerAuth.findFirst({
      where: {
        playerId: player_id,
        payload
      },
    });

    if (!playerAuth) {
      return null;
    }

    return parsePlayerAuth(playerAuth);
  }

  async findManyByPlayerId(player_id: string): Promise<PlayerAuth[]> {
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

    if(foundPlayerAuth?.isValidToken) {
      return true
    }

    return false;
  }
}
