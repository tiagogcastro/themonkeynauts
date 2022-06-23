import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IPrivateSale } from '../entities/private-sale';

interface IPrivateSalesRepository {
  create(data: IPrivateSale): Promise<void>;
  listAllPrivateSales(): Promise<IPrivateSale[]>;
  findByTxHash(txHash: string): AsyncMaybe<IPrivateSale>;
  listAllPrivateSalesFromWallet(wallet: string): Promise<IPrivateSale[]>;
  listAllPrivateSalesFromPlayer(playerId: string): Promise<IPrivateSale[]>;
}
export { IPrivateSalesRepository };
