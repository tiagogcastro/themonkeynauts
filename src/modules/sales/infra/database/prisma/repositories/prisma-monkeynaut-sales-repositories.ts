import {
  IMonkeynautSale,
  MonkeynautSale,
  MonkeynautSalePropsOmittedCommons,
} from '@modules/sales/domain/entities/monkeynaut-sale';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { MonkeynautSale as PrismaMonkeynautSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parseMonkeynautSale = (
  monkeynautsale: PrismaMonkeynautSale,
): IMonkeynautSale => {
  return new MonkeynautSale(
    monkeynautsale as MonkeynautSalePropsOmittedCommons,
    {
      id: monkeynautsale.id,
      createdAt: monkeynautsale.createdAt,
      updatedAt: monkeynautsale.updatedAt,
    },
  ).monkeynautSale;
};

class PrismaMonkeynautSalesRepository implements IMonkeynautSalesRepository {
  async create({ id: monkeynautId, ...props }: IMonkeynautSale): Promise<void> {
    await prisma.monkeynautSale.create({
      data: {
        id: monkeynautId,
        ...props,
      },
    });
  }

  async listManyMonkeynauts(): Promise<IMonkeynautSale[]> {
    const monkeynautsales = await prisma.monkeynautSale.findMany({
      where: {
        active: true,
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

    return monkeynautsales.map(parseMonkeynautSale);
  }

  async listManyMonkeynautsWithoutException(): Promise<IMonkeynautSale[]> {
    const monkeynautsales = await prisma.monkeynautSale.findMany();

    return monkeynautsales.map(parseMonkeynautSale);
  }

  async findById(monkeynautId: string): AsyncMaybe<IMonkeynautSale | null> {
    const monkeynautsale = await prisma.monkeynautSale.findUnique({
      where: {
        id: monkeynautId,
      },
    });

    if (!monkeynautsale) {
      return null;
    }

    return parseMonkeynautSale(monkeynautsale);
  }

  async update({ id: monkeynautId, ...props }: IMonkeynautSale): Promise<void> {
    await prisma.monkeynautSale.update({
      data: {
        id: monkeynautId,
        ...props,
      },
      where: {
        id: monkeynautId,
      },
    });
  }
}

export { PrismaMonkeynautSalesRepository };
