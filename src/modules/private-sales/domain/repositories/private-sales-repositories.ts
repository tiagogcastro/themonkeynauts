import { AsyncMaybe } from '@shared/types/maybe';
import { IPrivateSale } from '../entities/private-sale';

interface IPrivateSalesRepository {
  create(data: IPrivateSale): Promise<void>;
  listAllPrivateSales(): Promise<IPrivateSale[]>;
  findByTxHash(tx_hash: string): AsyncMaybe<IPrivateSale>;
  listAllPrivateSalesFromWallet(wallet: string): Promise<IPrivateSale[]>;
}
export { IPrivateSalesRepository };
