import { ConsumeFuelRequestDTO } from '@modules/ships/dtos/consume-fuel-request';
import { Ship } from '@modules/ships/domain/entities/ship';
import { ICronJobProvider } from '@shared/domain/providers/cronjob-provider';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class ConsumeFuelBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('CronJobProvider')
    private cronJobProvider: ICronJobProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ shipId, action }: ConsumeFuelRequestDTO): Promise<void> {
    const minutes = this.dateProvider.getMinutes(new Date());

    await this.cronJobProvider.run({
      cronTime: `${minutes} */1 * * *`,
      onTick: async () => {
        const ship = await this.shipsRepository.findById(shipId);

        const consumeFuelSchema = {
          TRAVEL: 100,
          BOUNTY_HUNT: 100,
        };

        const consumeFuel = consumeFuelSchema[action];

        if (!ship) {
          throw new AppError(
            'Could not consume fuel because the ship you entered does not exist',
            400,
          );
        }

        if (ship.fuel < consumeFuel) {
          await this.cronJobProvider.stop();

          return;
        }

        const fuel = ship.fuel - consumeFuel;

        const { ship: updatedShip } = new Ship(
          {
            ...ship,
            canRefuelAtStation: false,
            fuel,
          },
          {
            id: ship.id,
            createdAt: ship.createdAt,
          },
        );

        await this.shipsRepository.save(updatedShip);
      },
    });
  }
}

export { ConsumeFuelBusinessLogic };
