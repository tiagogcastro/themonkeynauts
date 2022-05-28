import { ILog, Log } from '../entities/log';

interface ILogsRepository {
  create(log: Log): Promise<void>;
  listAllLogs(): Promise<ILog[]>;
  listAllLogsFromPlayer(player_id: string): Promise<ILog[]>;
}
export { ILogsRepository };
