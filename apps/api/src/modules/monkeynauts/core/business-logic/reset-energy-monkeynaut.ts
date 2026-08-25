import { inject, injectable } from 'tsyringe';

import { Monkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';

import { ICronJobProvider } from '@shared/domain/providers/cronjob-provider';

import { getPercentageInt } from '@shared/helpers';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class ResetEnergyMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('CronJobProvider')
    private cronJobProvider: ICronJobProvider,
  ) {}

  async execute(): Promise<void> {
    await this.cronJobProvider.run({
      // 58 11,23 * * * -> executa em (11:58h e 23:58h)
      cronTime: '58 11,23 * * *',
      onTick: async () => {
        const foundMonkeynauts = await this.monkeynautsRepository.findMany();

        foundMonkeynauts?.map(async monkeynaut => {
          let newEnergy =
            monkeynaut.energy +
            getPercentageInt({
              percentage: 50,
              value: monkeynaut.maxEnergy,
            });

          if (monkeynaut.maxEnergy % 2 === 1) {
            newEnergy = Math.round(newEnergy);

            if (monkeynaut.energy > 0) {
              newEnergy = monkeynaut.maxEnergy;
            }
          }

          if (newEnergy <= monkeynaut.maxEnergy) {
            const { monkeynaut: monkeynautUpdated } = new Monkeynaut(
              {
                ...monkeynaut,
                energy: newEnergy,
              },
              {
                id: monkeynaut.id,
                createdAt: monkeynaut.createdAt,
                updatedAt: new Date(),
              },
            );

            await this.monkeynautsRepository.update(monkeynautUpdated);
          }
        });
      },
    });
  }
}

export { ResetEnergyMonkeynautBusinessLogic };
