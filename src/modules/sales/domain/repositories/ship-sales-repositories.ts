import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IShipSale } from '../entities/ship-sale';

interface IShipSalesRepository {
  findById(shipId: string): AsyncMaybe<IShipSale>;
  create(shipSale: IShipSale): Promise<void>;
  listManyShips(): Promise<IShipSale[]>;
  listManyShipsWithoutException(): Promise<IShipSale[]>;
  listManyShipsNotActived(): Promise<IShipSale[]>;
  update(shipSale: IShipSale): Promise<void>;
}

export { IShipSalesRepository };
