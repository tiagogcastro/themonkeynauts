import { IPackSale } from '../entities/pack-sale';

interface IPackSalesRepository {
  create(packSale: IPackSale): Promise<void>;
  listManyPacks(): Promise<IPackSale[]>;
  listManyPacksWithoutException(): Promise<IPackSale[]>;
}

export { IPackSalesRepository };
