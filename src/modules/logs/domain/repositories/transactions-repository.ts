import { AsyncMaybe } from '@shared/types/maybe';
import { ITransaction } from '../entities/transaction';

interface ITransactionsRepository {
  create(transaction: ITransaction): Promise<void>;
  listAllTransactions(): Promise<ITransaction[]>;
  findByTxHash(tx_hash: string): AsyncMaybe<ITransaction>;
  listAllTransactionsFromWallet(wallet: string): Promise<ITransaction[]>;
}
export { ITransactionsRepository };
