import { Log } from '@prisma/client';
import { ILogsRepository } from '../../repositories/ILogsRepositories';

type Response = {
  log: Log;
}[]

class ListLogsBusinessLogic {
  constructor(
    private logsRepository: ILogsRepository,
  ) {}

  async execute(player_id?: string): Promise<Response> {
    let logs: Log[] = [];

    if(player_id) {
        logs = await this.logsRepository.listAllLogsFromPlayerId(player_id);
    } else {
        logs = await this.logsRepository.listAllLogs();
    }

    return logs.map(log => ({ log }))
  }
}

export { ListLogsBusinessLogic };
