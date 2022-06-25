import { IPlayer, Player } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Player as PrismaPlayer } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

const parsePlayer = (player: PrismaPlayer): IPlayer => {
  return new Player(player as Player, {
    id: player.id,
    createdAt: player.createdAt,
    updatedAt: player.updatedAt,
  }).player;
};
class PrismaPlayersRepository implements IPlayersRepository {
  async hasWallet(playerId: string): Promise<boolean> {
    const hasWallet = !!(await prisma.player.findFirst({
      where: {
        id: playerId,
        NOT: {
          wallet: null,
        },
      },
    }));

    return hasWallet;
  }

  async findByWallet(wallet: string): AsyncMaybe<IPlayer> {
    const player = await prisma.player.findFirst({
      where: {
        wallet,
      },
    });

    if (!player) {
      return null;
    }

    return parsePlayer(player);
  }

  async findByNickname(nickname: string): AsyncMaybe<IPlayer> {
    const player = await prisma.player.findFirst({
      where: {
        nickname,
      },
    });

    if (!player) {
      return null;
    }

    return parsePlayer(player);
  }

  async findByEmail(email: string): AsyncMaybe<IPlayer> {
    const player = await prisma.player.findFirst({
      where: {
        email,
      },
    });

    if (!player) {
      return null;
    }

    return parsePlayer(player);
  }

  async findById(playerId: string): AsyncMaybe<IPlayer> {
    const player = await prisma.player.findFirst({
      where: {
        id: playerId,
        isEnabled: true,
      },
    });

    if (!player) {
      return null;
    }

    return parsePlayer(player);
  }

  async create(player: IPlayer): Promise<void> {
    const { id: playerId, ...props } = player;

    await prisma.player.create({
      data: {
        id: playerId,
        ...props,
      },
    });
  }

  async save(player: IPlayer): Promise<void> {
    const { id: playerId, ...props } = player;

    await prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        ...props,
        updatedAt: new Date(),
      },
    });
  }

  async findPlayers(): Promise<IPlayer[]> {
    const players = await prisma.player.findMany();

    return players.map(parsePlayer);
  }
}

export { PrismaPlayersRepository };
