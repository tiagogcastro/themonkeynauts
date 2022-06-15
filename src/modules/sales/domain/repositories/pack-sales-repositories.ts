import { AsyncMaybe } from '@shared/types/maybe';
import { IPackSale } from '../entities/pack-sale';

interface IPackSalesRepository {
  findById(packId: string): AsyncMaybe<IPackSale>;
  create(packSale: IPackSale): Promise<void>;
  listManyPacks(): Promise<IPackSale[]>;
  listManyPacksWithoutException(): Promise<IPackSale[]>;
  update(shipSale: IPackSale): Promise<void>;
  findById(shipSaleId: string): AsyncMaybe<IPackSale>;
}

export { IPackSalesRepository };
