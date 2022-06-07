import { ConsumeFuelRequestDTO } from '@modules/monkeynauts/dtos/consume-fuel-request';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class ConsumeFuelBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute({ ship_id, action }: ConsumeFuelRequestDTO): Promise<IShip> {
    const ship = await this.shipsRepository.findById(ship_id);

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
      throw new AppError(
        'Could not consume fuel because the ship does not have enough fuel',
        400,
      );
    }

    const fuel = ship.fuel - consumeFuel;

    const { ship: updatedShip } = new Ship(
      {
        ...ship,
        fuel,
      },
      {
        id: ship.id,
        createdAt: ship.createdAt,
      },
    );

    await this.shipsRepository.save(updatedShip);

    return updatedShip;
  }
}

export { ConsumeFuelBusinessLogic };
