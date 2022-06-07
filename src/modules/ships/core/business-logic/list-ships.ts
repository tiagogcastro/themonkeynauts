import { IShip } from '@modules/ships/domain/entities/ship';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class ListShipsBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute(player_id?: string): Promise<IShip[]> {
    if (player_id) {
      return this.shipsRepository.listAllShipsFromPlayer(player_id);
    }

    const ships = await this.shipsRepository.listAllShips();

    return ships;
  }
}

export { ListShipsBusinessLogic };
