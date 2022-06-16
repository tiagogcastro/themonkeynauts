import { AsyncMaybe } from '@shared/types/maybe';
import { IShipSale } from '../entities/ship-sale';

interface IShipSalesRepository {
  findById(shipId: string): AsyncMaybe<IShipSale>;
  create(shipSale: IShipSale): Promise<void>;
  listManyShips(): Promise<IShipSale[]>;
  listManyShipsWithoutException(): Promise<IShipSale[]>;
  listManyShipsNotActived(): Promise<IShipSale[]>;
  update(shipSale: IShipSale): Promise<void>;
  findById(shipSaleId: string): AsyncMaybe<IShipSale>;
}

export { IShipSalesRepository };
