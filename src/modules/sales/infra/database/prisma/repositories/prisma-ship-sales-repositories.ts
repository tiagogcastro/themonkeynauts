import {
  IShipSale,
  ShipSale,
  ShipSalePropsOmittedCommons,
} from '@modules/sales/domain/entities/ship-sale';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { ShipSale as PrismaShipSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

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
        active: {
          equals: true,
        },
        currentQuantityAvailable: {
          not: {
            equals: 0,
          },
        },
        startDate: {
          lte: new Date(),
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

  async listManyShipsWithoutException(): Promise<IShipSale[]> {
    const shipSales = await prisma.shipSale.findMany();

    return shipSales.map(parseShipSale);
  }

  async listManyShipsNotActived(): Promise<IShipSale[]> {
    const shipsales = await prisma.shipSale.findMany({
      where: {
        OR: [
          {
            active: { equals: false },
          },
          {
            startDate: {
              gt: new Date(),
            },
          },
          {
            endDate: {
              gte: new Date(),
            },
          },
        ],
      },
    });

    return shipsales.map(parseShipSale);
  }

  async findById(shipId: string): AsyncMaybe<IShipSale | null> {
    const shipsale = await prisma.shipSale.findUnique({
      where: {
        id: shipId,
      },
    });

    if (!shipsale) {
      return null;
    }

    return parseShipSale(shipsale);
  }

  async update({ id: shipId, ...props }: IShipSale): Promise<void> {
    await prisma.shipSale.update({
      data: {
        id: shipId,
        ...props,
      },
      where: {
        id: shipId,
      },
    });
  }
}

export { PrismaShipSalesRepository };
