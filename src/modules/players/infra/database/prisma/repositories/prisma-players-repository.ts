import { Player } from '@modules/players/domain/entities/player';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Player as PrismaPlayer } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parsePlayer = (player: PrismaPlayer): Player => {
  return new Player(
    {
      canBountyHunt: player.canBountyHunt,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
      email: player.email,
      enabled: player.enabled,
      hasAsteroid: player.hasAsteroid,
      nickname: player.nickname,
      password: player.password,
      role: player.role as PlayerRole,
      wallet: player.wallet,
    },
    player.id,
  );
};
class PrismaPlayersRepository implements IPlayersRepository {
  async findByNickname(nickname: string, enabled = true): AsyncMaybe<Player> {
    const player = await prisma.player.findFirst({
      where: {
        nickname,
        enabled,
      },
    });

    if (!player) {
      return null;
    }

    return parsePlayer(player);
  }

  async findByEmail(email: string): AsyncMaybe<Player> {
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

  async findById(player_id: string): AsyncMaybe<Player> {
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

  async create(player: Player): Promise<void> {
    await prisma.player.create({
      data: {
        id: player.id,
        canBountyHunt: player.canBountyHunt,
        createdAt: player.createdAt,
        updatedAt: player.updatedAt,
        email: player.email,
        enabled: player.enabled,
        hasAsteroid: player.hasAsteroid,
        nickname: player.nickname,
        password: player.password,
        role: player.role as PlayerRole,
        wallet: player.wallet,
      },
    });
  }

  async save({ id: player_id, ...data }: Player): Promise<void> {
    await prisma.player.update({
      where: {
        id: player_id,
      },
      data,
    });
  }

  async findPlayers(): Promise<Player[]> {
    const players = await prisma.player.findMany();

    return players.map(parsePlayer);
  }
}

export { PrismaPlayersRepository };
