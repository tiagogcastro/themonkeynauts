import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IPrivateSaleP2P } from '../entities/private-p2p';

interface IPrivateSaleP2PRepository {
  create(log: IPrivateSaleP2P): Promise<void>;
  listAllPrivateSaleP2P(): Promise<IPrivateSaleP2P[]>;
  findByTxHash(txHash: string): AsyncMaybe<IPrivateSaleP2P>;
  listManyPrivateSaleP2PFromPlayer(email: string): Promise<IPrivateSaleP2P[]>;
}
export { IPrivateSaleP2PRepository };
