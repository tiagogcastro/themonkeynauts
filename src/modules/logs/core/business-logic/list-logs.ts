import { ILog } from '@modules/logs/domain/entities/log';
import { rarity } from '@shared/helpers/rarity';
import { inject, injectable } from 'tsyringe';
import { ILogsRepository } from '../../domain/repositories/logs-repositories';

@injectable()
class ListLogsBusinessLogic {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute(player_id?: string): Promise<ILog[]> {
    let logs: ILog[] = [];

    const rarityKey = await rarity({
      soldier: 40,
      engineer: 30,
      scientist: 30,
    });

    return rarityKey;

    if (player_id) {
      logs = await this.logsRepository.listAllLogsFromPlayer(player_id);
    } else {
      logs = await this.logsRepository.listAllLogs();
    }

    return logs;
  }
}

export { ListLogsBusinessLogic };
