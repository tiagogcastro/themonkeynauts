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
  async findById(packId: string): AsyncMaybe<IPackSale> {
    const packSale = await prisma.packSale.findUnique({
      where: { id: packId },
    });

    if (!packSale) {
      return null;
    }

    return parsePackSale(packSale);
  }

  async create({ id: packId, ...props }: IPackSale): Promise<void> {
    await prisma.packSale.create({
      data: {
        id: packId,
        ...props,
      },
    });
  }

  async listManyPacks(): Promise<IPackSale[]> {
    const packSales = await prisma.packSale.findMany();

    return packSales.map(parsePackSale);
  }
}

export { PrismaPackSalesRepository };
