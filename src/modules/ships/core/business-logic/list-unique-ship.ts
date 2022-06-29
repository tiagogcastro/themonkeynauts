import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip } from '@modules/ships/domain/entities/ship';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

type ListUniqueShipRequest = {
  playerId: string;
  shipId: string;
};

type ListUniqueShipResponse = {
  ship: IShip;
};

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
  }: ListUniqueShipRequest): Promise<ListUniqueShipResponse> {
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

    return {
      ship,
    };
  }
}

export { ListUniqueShipBusinessLogic };
