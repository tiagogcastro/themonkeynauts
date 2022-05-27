import { Log } from '@prisma/client';
import crypto from 'node:crypto';
import { CreateLogDTO, ILogsRepository } from '../ILogsRepositories';

class LogsRepository implements ILogsRepository {
  async create(data: CreateLogDTO): Promise<Log> {
    const log = await prisma.log.create({
      data: {
        id: crypto.randomUUID(),
        ...data
      },
    });

    return log 
  }
  
  async listAllLogs(): Promise<Log[]> {
    const logs = await prisma.log.findMany();

    return logs 
  }

  async listAllLogsFromPlayerId(player_id: string): Promise<Log[]> {
    const logs = await prisma.log.findMany({
        where: {
            player_id
        }
    });

    return logs 
  }
}

export { LogsRepository };
