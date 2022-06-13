import { IMonkeynautSale } from '../entities/monkeynaut-sale';

interface IMonkeynautSalesRepository {
  create(monkeynautSale: IMonkeynautSale): Promise<void>;
  listManyMonkeynauts(): Promise<IMonkeynautSale[]>;
}

export { IMonkeynautSalesRepository };
