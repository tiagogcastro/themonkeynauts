import { AsyncMaybe } from '@shared/types/maybe';
import { ILog } from '../entities/log';

interface ILogsRepository {
  create(log: ILog): Promise<void>;
  listAllLogs(): Promise<ILog[]>;
  findByTxHash(txHash: string): AsyncMaybe<ILog>;
  listAllLogsFromPlayer(playerId: string): Promise<ILog[]>;
}
export { ILogsRepository };
