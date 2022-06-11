import { IMonkeynautSale } from '../entities/monkeynaut-sale';
import { IPackSale } from '../entities/pack-sale';
import { ISaleEvent } from '../entities/sale-event';
import { IShipSale } from '../entities/ship-sale';

interface ISaleEventsRepository {
  createSaleEvent(saleEvent: ISaleEvent): Promise<void>;

  createMonkeynautSale(monkeynautSale: IMonkeynautSale): Promise<void>;
  createPackSale(packSale: IPackSale): Promise<void>;
  createShipSale(shipSale: IShipSale): Promise<void>;

  listAllSaleEvents(): Promise<ISaleEvent[]>;
}
export { ISaleEventsRepository };
