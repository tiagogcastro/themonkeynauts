import { ICrew, Crew } from '@modules/crews/domain/entities/crew';
import { ICrewsRepository } from '@modules/crews/domain/repositories/crews-repositories';
import { Crew as PrismaCrew } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parseCrew = (crew: PrismaCrew): ICrew => {
  return new Crew(crew, {
    id: crew.id,
    createdAt: crew.createdAt,
    updatedAt: crew.updatedAt,
  }).crew;
};

class PrismaCrewsRepository implements ICrewsRepository {
  async save(crew: Crew): Promise<void> {
    const { id: crew_id, ...props } = crew;

    await prisma.crew.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: crew_id,
      },
    });
  }

  async destroy(crew_id: string): Promise<void> {
    await prisma.crew.delete({
      where: {
        id: crew_id,
      },
    });
  }

  async create(crew: ICrew): Promise<void> {
    const { id: crew_id, ...props } = crew;

    await prisma.crew.create({
      data: {
        id: crew_id,
        ...props,
      },
    });
  }

  async update(crew: ICrew): Promise<void> {
    const { id: crew_id, ...props } = crew;

    await prisma.crew.update({
      data: {
        id: crew_id,
        ...props,
      },
      where: {
        id: crew_id,
      },
    });
  }

  async findById(crew_id: string): AsyncMaybe<ICrew> {
    const crew = await prisma.crew.findUnique({
      where: {
        id: crew_id,
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
}

export { PrismaCrewsRepository };
