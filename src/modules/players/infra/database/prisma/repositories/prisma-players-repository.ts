import { IPlayer, Player } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Player as PrismaPlayer } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parsePlayer = (player: PrismaPlayer): IPlayer => {
  return new Player(player as Player, {
    id: player.id,
    createdAt: player.createdAt,
    updatedAt: player.updatedAt,
  }).player;
};
class PrismaPlayersRepository implements IPlayersRepository {
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

  async findById(player_id: string): AsyncMaybe<IPlayer> {
    const player = await prisma.player.findFirst({
      where: {
        id: player_id,
        enabled: true,
      },
    });

    if (!player) {
      return null;
    }

    return parsePlayer(player);
  }

  async create(player: IPlayer): Promise<void> {
    const { id: player_id, ...props } = player;

    await prisma.player.create({
      data: {
        id: player_id,
        ...props,
      },
    });
  }

  async save(player: IPlayer): Promise<void> {
    const { id: player_id, ...props } = player;

    await prisma.player.update({
      where: {
        id: player_id,
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
