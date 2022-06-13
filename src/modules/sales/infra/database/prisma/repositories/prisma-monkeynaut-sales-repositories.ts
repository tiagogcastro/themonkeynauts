import {
  IMonkeynautSale,
  MonkeynautSale,
  MonkeynautSalePropsOmittedCommons,
} from '@modules/sales/domain/entities/monkeynaut-sale';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { MonkeynautSale as PrismaMonkeynautSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

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
    const monkeynautsales = await prisma.monkeynautSale.findMany();

    return monkeynautsales.map(parseMonkeynautSale);
  }
}

export { PrismaMonkeynautSalesRepository };
