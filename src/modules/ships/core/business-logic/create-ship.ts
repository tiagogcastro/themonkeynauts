import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { CreateShipRequestDTO } from '@modules/ships/dtos/create-ship-request';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class CreateShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute({
    ownerId,
    playerId,
    name,
    class: _class,
    rank,
    bonusValue,
    bonusDescription,
    tankCapacity,
    fuel,
    breedCount,
    onSale,
  }: CreateShipRequestDTO): Promise<IShip> {
    const { ship } = new Ship({
      ownerId,
      playerId,
      name,
      class: _class,
      rank,
      bonusValue,
      bonusDescription,
      tankCapacity,
      fuel,
      avatar: null,
      breedCount,
      onSale,
    });

    await this.shipsRepository.create(ship);

    return ship;
  }
}

export { CreateShipBusinessLogic };
