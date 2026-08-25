import { IResource, Resource } from '@modules/players/domain/entities/resource';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { Resource as PrismaResource } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

export const parseResource = (player: PrismaResource): IResource => {
  return new Resource(player, {
    id: player.id,
    createdAt: player.createdAt,
    updatedAt: player.updatedAt,
  }).resource;
};

class PrismaResourcesRepository implements IResourcesRepository {
  async findByPlayerId(playerId: string): AsyncMaybe<IResource> {
    const player = await prisma.resource.findUnique({
      where: {
        playerId,
      },
    });

    if (!player) {
      return null;
    }

    return parseResource(player);
  }

  async create(resource: IResource): Promise<void> {
    const { id: resourceId, ...props } = resource;

    await prisma.resource.create({
      data: {
        id: resourceId,
        ...props,
      },
    });
  }

  async save(resource: IResource): Promise<void> {
    const { id: resourceId, ...props } = resource;

    await prisma.resource.update({
      where: {
        id: resourceId,
      },
      data: {
        ...props,
        updatedAt: new Date(),
      },
    });
  }
}

export { PrismaResourcesRepository };
