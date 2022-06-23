import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { ShipsSaveManyDTO } from '@modules/ships/dtos/ships-save-many';
import { Ship as PrismaShip } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

const parseShip = (ship: PrismaShip): IShip => {
  return new Ship(ship, {
    id: ship.id,
    createdAt: ship.createdAt,
    updatedAt: ship.updatedAt,
  }).ship;
};

class PrismaShipsRepository implements IShipsRepository {
  async saveMany({ canRefuelAtStation }: ShipsSaveManyDTO): Promise<void> {
    await prisma.ship.updateMany({
      data: {
        canRefuelAtStation,
      },
    });
  }

  async findById(shipId: string): AsyncMaybe<IShip> {
    const ship = await prisma.ship.findUnique({
      where: {
        id: shipId,
      },
    });

    if (!ship) {
      return null;
    }

    return parseShip(ship);
  }

  async findByIdAndPlayerId(
    shipId: string,
    playerId: string,
  ): AsyncMaybe<IShip> {
    const ship = await prisma.ship.findFirst({
      where: {
        id: shipId,
        playerId,
      },
    });

    if (!ship) {
      return null;
    }

    return parseShip(ship);
  }

  async save(ship: Ship): Promise<void> {
    const { id: shipId, ...props } = ship;

    await prisma.ship.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: shipId,
      },
    });
  }

  async destroy(shipId: string): Promise<void> {
    await prisma.ship.delete({
      where: {
        id: shipId,
      },
    });
  }

  async create(ship: IShip): Promise<void> {
    const { id: shipId, ...props } = ship;

    await prisma.ship.create({
      data: {
        id: shipId,
        ...props,
      },
    });
  }

  async listAllShips(): Promise<IShip[]> {
    const ships = await prisma.ship.findMany();

    return ships.map(parseShip);
  }

  async listAllShipsFromPlayer(playerId: string): Promise<IShip[]> {
    const ships = await prisma.ship.findMany({
      where: {
        playerId,
      },
    });

    return ships.map(parseShip);
  }
}

export { PrismaShipsRepository };
