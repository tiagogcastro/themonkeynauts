import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { Ship as PrismaShip } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

const parseShip = (ship: PrismaShip): IShip => {
  return new Ship(ship, {
    id: ship.id,
    createdAt: ship.createdAt,
    updatedAt: ship.updatedAt,
  }).ship;
};

class PrismaShipsRepository implements IShipsRepository {
  async save(ship: Ship): Promise<void> {
    const { id: ship_id, ...props } = ship;

    await prisma.ship.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: ship_id,
      },
    });
  }

  async destroy(ship_id: string): Promise<void> {
    await prisma.ship.delete({
      where: {
        id: ship_id,
      },
    });
  }

  async create(ship: IShip): Promise<void> {
    const { id: ship_id, ...props } = ship;

    await prisma.ship.create({
      data: {
        id: ship_id,
        ...props,
      },
    });
  }

  async listAllShips(): Promise<IShip[]> {
    const ships = await prisma.ship.findMany();

    return ships.map(parseShip);
  }

  async listAllShipsFromPlayer(player_id: string): Promise<IShip[]> {
    const ships = await prisma.ship.findMany({
      where: {
        playerId: player_id,
      },
    });

    return ships.map(parseShip);
  }
}

export { PrismaShipsRepository };
