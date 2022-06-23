import { AsyncMaybe } from '@shared/core/logic/maybe';
import { ILog } from '../entities/log';

interface ILogsRepository {
  create(log: ILog): Promise<void>;
  listAllLogs(): Promise<ILog[]>;
  findByTxHash(txHash: string): AsyncMaybe<ILog>;
  listAllLogsFromPlayer(playerId: string): Promise<ILog[]>;
}
export { ILogsRepository };
