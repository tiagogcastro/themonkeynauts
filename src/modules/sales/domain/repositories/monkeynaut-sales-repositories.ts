import { AsyncMaybe } from '@shared/types/maybe';
import { IMonkeynautSale } from '../entities/monkeynaut-sale';

interface IMonkeynautSalesRepository {
  findById(monkeynautId: string): AsyncMaybe<IMonkeynautSale>;
  create(monkeynautSale: IMonkeynautSale): Promise<void>;
  listManyMonkeynauts(): Promise<IMonkeynautSale[]>;
}

export { IMonkeynautSalesRepository };
