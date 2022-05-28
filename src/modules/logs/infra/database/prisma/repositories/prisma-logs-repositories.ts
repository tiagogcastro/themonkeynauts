import { ILog, Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Log as PrismaLog } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

const parseLog = (log: PrismaLog): ILog => {
  return new Log(log, log.id).log;
};

class PrismaLogsRepository implements ILogsRepository {
  async create({ id, createdAt, updatedAt, props }: Log): Promise<void> {
    await prisma.log.create({
      data: {
        id,
        ...props,
        createdAt,
        updatedAt,
      },
    });
  }

  async listAllLogs(): Promise<ILog[]> {
    const logs = await prisma.log.findMany();

    return logs.map(parseLog);
  }

  async listAllLogsFromPlayer(player_id: string): Promise<ILog[]> {
    const logs = await prisma.log.findMany({
      where: {
        playerId: player_id,
      },
    });

    return logs.map(parseLog);
  }
}

export { PrismaLogsRepository };
