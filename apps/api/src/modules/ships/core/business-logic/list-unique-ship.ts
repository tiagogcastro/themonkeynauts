import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip } from '@modules/ships/domain/entities/ship';
import { Either, right } from '@shared/core/logic/either';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

export type ListUniqueShipRequestDTO = {
  playerId: string;
  shipId: string;
};

export type ListUniqueShipResponse = Either<
  Error,
  {
    ship: IShip;
  }
>;

@injectable()
class ListUniqueShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    playerId,
    shipId,
  }: ListUniqueShipRequestDTO): Promise<ListUniqueShipResponse> {
    const foundPlayer = await this.playersRepository.findById(playerId);

    if (!foundPlayer) {
      throw new AppError('Player does not exist', 404);
    }

    const ship = await this.shipsRepository.findByIdAndPlayerId(
      shipId,
      playerId,
    );

    if (!ship) {
      throw new AppError('Ship does not exist', 404);
    }

    return right({
      ship,
    });
  }
}

export { ListUniqueShipBusinessLogic };
