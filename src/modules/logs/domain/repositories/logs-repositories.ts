import { ILog, Log } from '../entities/log';

interface ILogsRepository {
  create(log: Log): Promise<void>;
  listAllLogs(): Promise<ILog[]>;
  listAllLogsFromPlayer(playerId: string): Promise<ILog[]>;
}
export { ILogsRepository };
