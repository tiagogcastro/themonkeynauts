import {
  IShipSale,
  ShipSale,
  ShipSalePropsOmittedCommons,
} from '@modules/sales/domain/entities/ship-sale';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { ShipSale as PrismaShipSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

const parseShipSale = (shipSale: PrismaShipSale): IShipSale => {
  return new ShipSale(shipSale as ShipSalePropsOmittedCommons, {
    id: shipSale.id,
    createdAt: shipSale.createdAt,
    updatedAt: shipSale.updatedAt,
  }).shipSale;
};

class PrismaShipSalesRepository implements IShipSalesRepository {
  async create({ id: shipId, ...props }: IShipSale): Promise<void> {
    await prisma.shipSale.create({
      data: {
        id: shipId,
        ...props,
      },
    });
  }

  async listManyShips(): Promise<IShipSale[]> {
    const shipSales = await prisma.shipSale.findMany({
      where: {
        active: true,
        quantity: {
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

    return shipSales.map(parseShipSale);
  }
}

export { PrismaShipSalesRepository };
