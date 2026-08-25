import { ICrew } from '@modules/crews/domain/entities/crew';
import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { Monkeynaut as PrismaMonkeynaut } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

const parseMonkeynaut = (monkeynaut: PrismaMonkeynaut): IMonkeynaut => {
  return new Monkeynaut(monkeynaut, {
    id: monkeynaut.id,
    createdAt: monkeynaut.createdAt,
    updatedAt: monkeynaut.updatedAt,
  }).monkeynaut;
};

class PrismaMonkeynautsRepository implements IMonkeynautsRepository {
  async save(monkeynaut: Monkeynaut): Promise<void> {
    const { id: monkeynaut_id, ...props } = monkeynaut;

    await prisma.monkeynaut.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: monkeynaut_id,
      },
    });
  }

  async destroy(monkeynaut_id: string): Promise<void> {
    await prisma.monkeynaut.delete({
      where: {
        id: monkeynaut_id,
      },
    });
  }

  async create(monkeynaut: IMonkeynaut): Promise<void> {
    const { id: monkeynaut_id, ...props } = monkeynaut;

    await prisma.monkeynaut.create({
      data: {
        id: monkeynaut_id,
        ...props,
      },
    });
  }

  async update(monkeynaut: IMonkeynaut): Promise<void> {
    const { id: monkeynaut_id, ...props } = monkeynaut;

    await prisma.monkeynaut.update({
      data: {
        id: monkeynaut_id,
        ...props,
      },
      where: {
        id: monkeynaut_id,
      },
    });
  }

  async listAllMonkeynauts(): Promise<IMonkeynaut[]> {
    const monkeynauts = await prisma.monkeynaut.findMany();

    return monkeynauts.map(parseMonkeynaut);
  }

  async listAllMonkeynautsFromPlayer(playerId: string): Promise<IMonkeynaut[]> {
    const monkeynauts = await prisma.monkeynaut.findMany({
      where: {
        playerId,
      },
    });

    return monkeynauts.map(parseMonkeynaut);
  }

  async findById(monkeynaut_id: string): AsyncMaybe<IMonkeynaut> {
    const monkeynaut = await prisma.monkeynaut.findUnique({
      where: {
        id: monkeynaut_id,
      },
    });

    if (!monkeynaut) {
      return null;
    }

    return parseMonkeynaut(monkeynaut);
  }

  async findMany(): Promise<IMonkeynaut[]> {
    return prisma.monkeynaut.findMany();
  }

  async findManyByCrews(crews: ICrew[]): Promise<IMonkeynaut[]> {
    return prisma.monkeynaut.findMany({
      where: {
        OR: crews.map(crew => ({ id: crew.monkeynautId })),
      },
    });
  }
}

export { PrismaMonkeynautsRepository };
