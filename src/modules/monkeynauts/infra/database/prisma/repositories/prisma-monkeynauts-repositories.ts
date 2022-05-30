import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { Monkeynaut as PrismaMonkeynaut } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

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

  async listAllMonkeynauts(): Promise<IMonkeynaut[]> {
    const monkeynauts = await prisma.monkeynaut.findMany();

    return monkeynauts.map(parseMonkeynaut);
  }

  async listAllMonkeynautsFromPlayer(
    player_id: string,
  ): Promise<IMonkeynaut[]> {
    const monkeynauts = await prisma.monkeynaut.findMany({
      where: {
        playerId: player_id,
      },
    });

    return monkeynauts.map(parseMonkeynaut);
  }
}

export { PrismaMonkeynautsRepository };
