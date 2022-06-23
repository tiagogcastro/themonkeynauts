import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip } from '@modules/ships/domain/entities/ship';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

export type ChangeActivePlayerShipDTO = {
  playerId: string;
  shipId: string;
};

export type ChangeActivePlayerShipResponse = {
  player: IPlayer;
  shipActive: IShip;
};

@injectable()
class ChangeActivePlayerShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    playerId,
    shipId,
  }: ChangeActivePlayerShipDTO): Promise<ChangeActivePlayerShipResponse> {
    const ship = await this.shipsRepository.findById(shipId);

    if (!ship) {
      throw new AppError('Ship does not exist');
    }

    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('Player does not exist');
    }

    if (ship.playerId !== playerId) {
      throw new AppError('Cannot active ship');
    }

    player.activeShipId = shipId;

    return {
      player,
      shipActive: ship,
    };
  }
}

export { ChangeActivePlayerShipBusinessLogic };
