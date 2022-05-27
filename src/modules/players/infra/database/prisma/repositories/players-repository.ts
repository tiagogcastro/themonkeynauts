import crypto from 'node:crypto';

import { Player } from '@modules/players/domain/entities/player';
import { prisma } from '@prisma/client';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';

import { AsyncMaybe } from '@shared/core/logic/Maybe';
import { CreatePlayerRequestDTO } from '@modules/players/core/dtos/create-player-request';

class PlayersRepository implements IPlayersRepository {
  async findByNickname(
    nickname: string,
    enabled: boolean = true,
  ): AsyncMaybe<Player> {
    const player = await prisma.player.findFirst({
      where: {
        nickname,
        ...(enabled ? { enabled } : {}),
      },
    });
    return player
  }

  async findByEmail(
    email: string,
  ): AsyncMaybe<Player> {
    const player = await prisma.player.findFirst({
      where: {
        email,
      },
    });
    return player
  }

  async findById(
    player_id: string,
  ): AsyncMaybe<Player> {
    const player = await prisma.player.findFirst({
      where: {
        id: player_id,
        enabled: true,
      },
   
    });
    return player
  }

  async create(data: CreatePlayerRequestDTO): Promise<Player> {
    const player = await prisma.player.create({
      data: {
        id: crypto.randomUUID(),
        ...data
      },
    });

    return player 
  }

  async save({
    id: player_id,
    ...data
  }: Player): Promise<Player> {
    const playerUpdated = await prisma.player.update({
      where: {
        id: player_id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    return playerUpdated 
  }

  async findPlayers(): AsyncMaybe<Player> {
    const players = await prisma.player.findMany();

    return players 
  }
}

export { PlayersRepository };
