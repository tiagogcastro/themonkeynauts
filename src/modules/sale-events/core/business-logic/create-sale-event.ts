import {
  ISaleEvent,
  SaleEvent,
} from '@modules/sale-events/domain/entities/sale-event';
import { ISaleEventsRepository } from '@modules/sale-events/domain/repositories/sale-events-repositories';
import { CreateSaleEventRequestDTO } from '@modules/sale-events/dtos/create-sale-event-request';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateSaleEventBusinessLogic {
  constructor(
    @inject('SaleEventsRepository')
    private saleEventsRepository: ISaleEventsRepository,
  ) {}

  async execute({ crypto: _ }: CreateSaleEventRequestDTO): Promise<ISaleEvent> {
    const { saleEvent } = new SaleEvent({} as any);

    return saleEvent;
  }
}

export { CreateSaleEventBusinessLogic };
