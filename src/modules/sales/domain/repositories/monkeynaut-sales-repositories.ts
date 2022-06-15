import { IMonkeynautSale } from '../entities/monkeynaut-sale';

interface IMonkeynautSalesRepository {
  create(monkeynautSale: IMonkeynautSale): Promise<void>;
  listManyMonkeynautsWithoutException(): Promise<IMonkeynautSale[]>;
  listManyMonkeynauts(): Promise<IMonkeynautSale[]>;
}

export { IMonkeynautSalesRepository };
