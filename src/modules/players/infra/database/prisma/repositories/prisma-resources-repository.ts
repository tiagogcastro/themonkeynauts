import { Resource } from '@modules/players/domain/entities/resource';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { Resource as PrismaResource } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

export const parseResource = (player: PrismaResource): Resource => {
  return new Resource(player as Resource, player.id);
};

class PrismaResourcesRepository implements IResourcesRepository {
  async findByPlayerId(player_id: string): AsyncMaybe<Resource> {
    const player = await prisma.resource.findUnique({
      where: {
        playerId: player_id,
      },
    });

    if (!player) {
      return null;
    }

    return parseResource(player);
  }

  async create(player: Resource): Promise<void> {
    await prisma.resource.create({
      data: player,
    });
  }

  async save({ id: player_id, ...data }: Resource): Promise<void> {
    await prisma.resource.update({
      where: {
        id: player_id,
      },
      data,
    });
  }
}

export { PrismaResourcesRepository };
