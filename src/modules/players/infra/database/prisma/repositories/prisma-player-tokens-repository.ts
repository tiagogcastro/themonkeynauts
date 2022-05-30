import {
  IPlayerToken,
  PlayerToken,
} from '@modules/players/domain/entities/player-token';
import { IPlayerTokensRepository } from '@modules/players/domain/repositories/player-tokens-repository';
import { PlayerToken as PrismaPlayerToken } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parsePlayerToken = (player_token: PrismaPlayerToken): IPlayerToken => {
  return new PlayerToken(player_token, {
    id: player_token.id,
    createdAt: player_token.createdAt,
    updatedAt: player_token.updatedAt,
  }).playerToken;
};

export class PrismaPlayerTokensRepository implements IPlayerTokensRepository {
  async findByPlayerId(player_id: string): AsyncMaybe<IPlayerToken> {
    const playerToken = await prisma.playerToken.findFirst({
      where: {
        playerId: player_id,
      },
    });

    if (!playerToken) {
      return null;
    }

    return parsePlayerToken(playerToken);
  }

  async destroy(player_token_id: string): Promise<void> {
    await prisma.playerToken.delete({
      where: {
        id: player_token_id,
      },
    });
  }

  async generate(player_token: IPlayerToken): Promise<void> {
    const { id: player_token_id, ...props } = player_token;

    await prisma.playerToken.create({
      data: {
        id: player_token_id,
        ...props,
      },
    });
  }

  async findByToken(token: string): AsyncMaybe<IPlayerToken> {
    const playerToken = await prisma.playerToken.findUnique({
      where: {
        token,
      },
    });

    if (!playerToken) {
      return null;
    }

    return parsePlayerToken(playerToken);
  }
}
