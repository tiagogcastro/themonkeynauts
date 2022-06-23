import { ILog, Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Log as PrismaLog } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

const parseLog = (log: PrismaLog): ILog => {
  return new Log(log, {
    id: log.id,
    createdAt: log.createdAt,
    updatedAt: log.updatedAt,
  }).log;
};

class PrismaLogsRepository implements ILogsRepository {
  async findByTxHash(txHash: string): AsyncMaybe<ILog> {
    const log = await prisma.log.findUnique({
      where: {
        txHash,
      },
    });

    if (!log) {
      return null;
    }

    return parseLog(log);
  }

  async create({ id: logId, ...props }: ILog): Promise<void> {
    if (props.txHash) {
      const log = await prisma.log.findUnique({
        where: {
          txHash: props.txHash,
        },
      });

      if (log) {
        return;
      }
    }

    await prisma.log.create({
      data: {
        id: logId,
        ...props,
      },
    });
  }

  async listAllLogs(): Promise<ILog[]> {
    const logs = await prisma.log.findMany();

    return logs.map(parseLog);
  }

  async listAllLogsFromPlayer(playerId: string): Promise<ILog[]> {
    const logs = await prisma.log.findMany({
      where: {
        playerId,
      },
    });

    return logs.map(parseLog);
  }
}

export { PrismaLogsRepository };
