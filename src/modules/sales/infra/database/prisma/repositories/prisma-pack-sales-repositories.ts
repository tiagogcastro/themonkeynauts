import {
  IPackSale,
  PackSale,
  PackSalePropsOmittedCommons,
} from '@modules/sales/domain/entities/pack-sale';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { PackSale as PrismaPackSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parsePackSale = (packSale: PrismaPackSale): IPackSale => {
  return new PackSale(packSale as PackSalePropsOmittedCommons, {
    id: packSale.id,
    createdAt: packSale.createdAt,
    updatedAt: packSale.updatedAt,
  }).packSale;
};

class PrismaPackSalesRepository implements IPackSalesRepository {
  async create({ id: packId, ...props }: IPackSale): Promise<void> {
    await prisma.packSale.create({
      data: {
        id: packId,
        ...props,
      },
    });
  }

  async listManyPacks(): Promise<IPackSale[]> {
    const packSales = await prisma.packSale.findMany({
      where: {
        active: {
          equals: true,
        },
        currentQuantityAvailable: {
          not: {
            equals: 0,
          },
        },
        OR: [
          {
            endDate: null,
          },
          {
            endDate: {
              gte: new Date(),
            },
          },
        ],
      },
    });

    return packSales.map(parsePackSale);
  }

  async listManyPacksNotActived(): Promise<IPackSale[]> {
    const packsales = await prisma.packSale.findMany({
      where: {
        OR: [
          {
            active: { equals: false },
          },
          {
            endDate: {
              lte: new Date(),
            },
          },
        ],
      },
    });

    return packsales.map(parsePackSale);
  }

  async listManyPacksWithoutException(): Promise<IPackSale[]> {
    const packSales = await prisma.packSale.findMany();

    return packSales.map(parsePackSale);
  }

  async findById(packId: string): AsyncMaybe<IPackSale | null> {
    const packsale = await prisma.packSale.findUnique({
      where: {
        id: packId,
      },
    });

    if (!packsale) {
      return null;
    }

    return parsePackSale(packsale);
  }

  async update({ id: packId, ...props }: IPackSale): Promise<void> {
    await prisma.packSale.update({
      data: {
        id: packId,
        ...props,
      },
      where: {
        id: packId,
      },
    });
  }
}

export { PrismaPackSalesRepository };
