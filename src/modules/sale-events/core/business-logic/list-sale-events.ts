import { ISaleEvent } from '@modules/sale-events/domain/entities/sale-event';
import { inject, injectable } from 'tsyringe';
import { ISaleEventsRepository } from '../../domain/repositories/sale-events-repositories';

@injectable()
class ListSaleEventsBusinesslogic {
  constructor(
    @inject('SaleEventsRepository')
    private saleEventsRepository: ISaleEventsRepository,
  ) {}

  async execute(): Promise<ISaleEvent[]> {
    const saleEvents = await this.saleEventsRepository.listAllSaleEvents();

    return saleEvents;
  }
}

export { ListSaleEventsBusinesslogic };
