import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IPackSale } from '../entities/pack-sale';

interface IPackSalesRepository {
  findById(packId: string): AsyncMaybe<IPackSale>;
  create(packSale: IPackSale): Promise<void>;
  listManyPacks(): Promise<IPackSale[]>;
  listManyPacksWithoutException(): Promise<IPackSale[]>;
  listManyPacksNotActived(): Promise<IPackSale[]>;

  update(shipSale: IPackSale): Promise<void>;
}

export { IPackSalesRepository };
