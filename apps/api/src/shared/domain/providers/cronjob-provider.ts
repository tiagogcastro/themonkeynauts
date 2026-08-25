import { CronJobStartDTO } from '@shared/dtos/cronjob-start-dto';

interface ICronJobProvider {
  run(data: CronJobStartDTO): Promise<void>;
  stop(): Promise<void>;
}

export { ICronJobProvider };
