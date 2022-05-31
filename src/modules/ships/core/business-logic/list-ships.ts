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
    let ships: IShip[] = [];

    if (player_id) {
      ships = await this.shipsRepository.listAllShipsFromPlayer(player_id);
    } else {
      ships = await this.shipsRepository.listAllShips();
    }

    return ships;
  }
}

export { ListShipsBusinessLogic };
