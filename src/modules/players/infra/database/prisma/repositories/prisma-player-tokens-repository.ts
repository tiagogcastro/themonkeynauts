import { PlayerToken } from '@modules/players/domain/entities/player-token';
import { IPlayerTokensRepository } from '@modules/players/domain/repositories/player-tokens-repository';
import { PlayerToken as PrismaPlayerToken } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

const parsePlayerToken = (player: PrismaPlayerToken): PlayerToken => {
  return new PlayerToken(player, player.id);
};

export class PrismaPlayerTokensRepository implements IPlayerTokensRepository {
  async findByPlayerId(player_id: string): Promise<PlayerToken | null> {
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

  async generate(playerToken: PlayerToken): Promise<void> {
    await prisma.playerToken.create({
      data: playerToken,
    });
  }

  async findByToken(token: string): Promise<PlayerToken | null> {
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
