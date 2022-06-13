import { IShipSale } from '../entities/ship-sale';

interface IShipSalesRepository {
  create(shipSale: IShipSale): Promise<void>;
  listManyShips(): Promise<IShipSale[]>;
}

export { IShipSalesRepository };
