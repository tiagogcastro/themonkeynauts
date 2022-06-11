import { IMonkeynautSale } from '@modules/sale-events/domain/entities/monkeynaut-sale';
import { IPackSale } from '@modules/sale-events/domain/entities/pack-sale';
import {
  ISaleEvent,
  SaleEvent,
} from '@modules/sale-events/domain/entities/sale-event';
import { IShipSale } from '@modules/sale-events/domain/entities/ship-sale';
import { ISaleEventsRepository } from '@modules/sale-events/domain/repositories/sale-events-repositories';
import { SaleEvent as PrismaSaleEvent } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

const parseSaleEvent = (saleEvent: PrismaSaleEvent): ISaleEvent => {
  return new SaleEvent(saleEvent, {
    id: saleEvent.id,
    createdAt: saleEvent.createdAt,
    updatedAt: saleEvent.updatedAt,
  }).saleEvent;
};

class PrismaSaleEventsRepository implements ISaleEventsRepository {
  async createMonkeynautSale({
    id: monkeynautId,
    ...props
  }: IMonkeynautSale): Promise<void> {
    await prisma.monkeynautSale.create({
      data: {
        id: monkeynautId,
        ...props,
      },
    });
  }

  async createShipSale({ id: shipId, ...props }: IShipSale): Promise<void> {
    await prisma.shipSale.create({
      data: {
        id: shipId,
        ...props,
      },
    });
  }

  async createPackSale({ id: packId, ...props }: IPackSale): Promise<void> {
    await prisma.packSale.create({
      data: {
        id: packId,
        ...props,
      },
    });
  }

  async createSaleEvent({
    id: saleEventId,
    ...props
  }: ISaleEvent): Promise<void> {
    await prisma.saleEvent.create({
      data: {
        id: saleEventId,
        ...props,
      },
    });
  }

  async listAllSaleEvents(): Promise<ISaleEvent[]> {
    const saleEvents = await prisma.saleEvent.findMany();

    return saleEvents.map(parseSaleEvent);
  }
}

export { PrismaSaleEventsRepository };
