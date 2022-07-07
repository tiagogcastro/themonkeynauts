import { ICronJobProvider } from '@shared/domain/providers/cronjob-provider';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class ResetFuelBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('CronJobProvider')
    private cronJobProvider: ICronJobProvider,
  ) {}

  async execute(): Promise<void> {
    await this.cronJobProvider.run({
      cronTime: '0 * * * *',
      onTick: async () => {
        await this.shipsRepository.saveManyByQueryRaw();
      },
    });
  }
}

export { ResetFuelBusinessLogic };
