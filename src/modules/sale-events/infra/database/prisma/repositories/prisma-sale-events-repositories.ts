import {
  ISaleEvent,
  SaleEvent,
} from '@modules/sale-events/domain/entities/sale-event';
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
  async create({ id: saleEventId, ...props }: ISaleEvent): Promise<void> {
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
