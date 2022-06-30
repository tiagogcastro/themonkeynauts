import { IShip } from '@modules/ships/domain/entities/ship';
import { Either, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

export type ListShipsRequestDTO = {
  playerId?: string;
};

export type ListShipsResponse = Either<
  Error,
  {
    ships: IShip[];
  }
>;

@injectable()
class ListShipsBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute({ playerId }: ListShipsRequestDTO): Promise<ListShipsResponse> {
    if (playerId) {
      const ships = await this.shipsRepository.listAllShipsFromPlayer(playerId);

      return right({
        ships,
      });
    }

    const ships = await this.shipsRepository.listAllShips();

    return right({
      ships,
    });
  }
}

export { ListShipsBusinessLogic };
