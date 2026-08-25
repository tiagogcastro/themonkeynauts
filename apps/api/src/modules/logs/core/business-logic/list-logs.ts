import { ILog } from '@modules/logs/domain/entities/log';
import { Either, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { ILogsRepository } from '../../domain/repositories/logs-repositories';

type ListLogsResponse = Either<Error, ILog[]>;
@injectable()
class ListLogsBusinessLogic {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute(playerId?: string): Promise<ListLogsResponse> {
    let logs: ILog[] = [];

    if (playerId) {
      logs = await this.logsRepository.listAllLogsFromPlayer(playerId);
    } else {
      logs = await this.logsRepository.listAllLogs();
    }

    return right(logs);
  }
}

export { ListLogsBusinessLogic };
