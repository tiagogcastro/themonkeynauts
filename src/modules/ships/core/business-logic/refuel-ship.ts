import { RefuelShipRequestDTO } from '@modules/monkeynauts/dtos/refuel-ship-request';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class RefuelShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute({ ship_id }: RefuelShipRequestDTO): Promise<IShip> {
    const ship = await this.shipsRepository.findById(ship_id);

    if (!ship) {
      throw new AppError(
        'Could not refuel the ship because the ship you entered does not exist',
        400,
      );
    }

    const replenished = ship.tankCapacity;

    const { ship: updatedShip } = new Ship(
      {
        ...ship,
        fuel: replenished,
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

export { RefuelShipBusinessLogic };
