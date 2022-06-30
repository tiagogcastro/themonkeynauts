import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip } from '@modules/ships/domain/entities/ship';
import { Either, right } from '@shared/core/logic/either';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

export type ChangeActivePlayerShipRequestDTO = {
  playerId: string;
  shipId: string;
};

export type ChangeActivePlayerShipResponse = Either<
  Error,
  {
    player: IPlayer;
    shipActive: IShip;
  }
>;

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
  }: ChangeActivePlayerShipRequestDTO): Promise<ChangeActivePlayerShipResponse> {
    const ship = await this.shipsRepository.findById(shipId);

    if (!ship) {
      throw new AppError('Ship does not exist');
    }

    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('Player does not exist');
    }

    if (ship.playerId !== playerId) {
      throw new AppError(
        'Unable to activate the ship because the ship belongs to another player',
      );
    }

    player.activeShipId = shipId;

    await this.playersRepository.save(player);

    return right({
      player,
      shipActive: ship,
    });
  }
}

export { ChangeActivePlayerShipBusinessLogic };
