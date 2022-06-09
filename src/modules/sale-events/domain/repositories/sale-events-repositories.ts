import { ISaleEvent, SaleEvent } from '../entities/sale-event';

interface ISaleEventsRepository {
  create(saleEvent: SaleEvent): Promise<void>;
  listAllSaleEvents(): Promise<ISaleEvent[]>;
}
export { ISaleEventsRepository };
