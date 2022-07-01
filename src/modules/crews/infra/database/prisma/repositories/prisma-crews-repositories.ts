import { ICrew, Crew } from '@modules/crews/domain/entities/crew';
import { ICrewsRepository } from '@modules/crews/domain/repositories/crews-repositories';
import { Crew as PrismaCrew } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

export const parseCrew = (crew: PrismaCrew): ICrew => {
  return new Crew(crew, {
    id: crew.id,
    createdAt: crew.createdAt,
    updatedAt: crew.updatedAt,
  }).crew;
};

class PrismaCrewsRepository implements ICrewsRepository {
  async save(crew: Crew): Promise<void> {
    const { id: crewId, ...props } = crew;

    await prisma.crew.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: crewId,
      },
    });
  }

  async destroy(crewId: string): Promise<void> {
    await prisma.crew.delete({
      where: {
        id: crewId,
      },
    });
  }

  async create(crew: ICrew): Promise<void> {
    const { id: crewId, ...props } = crew;

    await prisma.crew.create({
      data: {
        id: crewId,
        ...props,
      },
    });
  }

  async update(crew: ICrew): Promise<void> {
    const { id: crewId, ...props } = crew;

    await prisma.crew.update({
      data: {
        id: crewId,
        ...props,
      },
      where: {
        id: crewId,
      },
    });
  }

  async findById(crewId: string): AsyncMaybe<ICrew> {
    const crew = await prisma.crew.findUnique({
      where: {
        id: crewId,
      },
    });

    if (!crew) {
      return null;
    }

    return parseCrew(crew);
  }

  async findMany(): Promise<ICrew[]> {
    return prisma.crew.findMany();
  }

  async findUniqueByMonkeynautId(monkeynautId: string): Promise<ICrew | null> {
    const crew = await prisma.crew.findFirst({
      where: {
        monkeynautId,
      },
    });

    if (!crew) {
      return null;
    }

    return parseCrew(crew);
  }

  async findManyByShipId(shipId: string): Promise<ICrew[]> {
    const crews = await prisma.crew.findMany({
      where: {
        shipId,
      },
    });

    return crews.map(parseCrew);
  }
}

export { PrismaCrewsRepository };
