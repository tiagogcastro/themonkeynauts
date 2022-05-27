import { Log } from '@prisma/client';

type CreateLogDTO = {
  player_id: string;
  content: string;
}

interface ILogsRepository {
  create(data: CreateLogDTO): Promise<Log>;
  listAllLogs(): Promise<Log[]>;
  listAllLogsFromPlayerId(player_id: string): Promise<Log[]>;
}
export { ILogsRepository, CreateLogDTO };
