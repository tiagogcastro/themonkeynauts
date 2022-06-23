import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IMonkeynautSale } from '../entities/monkeynaut-sale';

interface IMonkeynautSalesRepository {
  findById(monkeynautId: string): AsyncMaybe<IMonkeynautSale>;
  create(monkeynautSale: IMonkeynautSale): Promise<void>;
  update(monkeynautSale: IMonkeynautSale): Promise<void>;
  listManyMonkeynautsWithoutException(): Promise<IMonkeynautSale[]>;
  listManyMonkeynauts(): Promise<IMonkeynautSale[]>;
  listManyMonkeynautsNotActived(): Promise<IMonkeynautSale[]>;
}

export { IMonkeynautSalesRepository };
