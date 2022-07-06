import { inject, injectable } from 'tsyringe';

import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { Either, left, right } from '@shared/core/logic/either';
import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';

import { IShipsRepository } from '../../domain/repositories/ships-repositories';

import {
  GameParamsNotFoundError,
  CannotRefuelBecauseIsAtMaxError,
  CannotRefuelShipAtStationError,
  CannotRefuelShipFoundError,
  DontEnoughSpcAmountError,
  PlayerNotFoundError,
  ResourceNotFoundError,
} from './errors';

export type RefuelShipRequestDTO = {
  shipId: string;
  playerId: string;
};

export type RefuelShipResponse = Either<
  Error,
  {
    ship: IShip;
  }
>;

@injectable()
class RefuelShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute({
    shipId,
    playerId,
  }: RefuelShipRequestDTO): Promise<RefuelShipResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const resource = await this.resourcesRepository.findByPlayerId(playerId);

    if (!resource) {
      return left(new ResourceNotFoundError());
    }

    const ship = await this.shipsRepository.findById(shipId, false);

    if (!ship) {
      return left(new CannotRefuelShipFoundError());
    }

    if (!ship.canRefuelAtStation) {
      return left(new CannotRefuelShipAtStationError());
    }

    const usedFuel = ship.tankCapacity - ship.fuel;

    if (usedFuel === 0) {
      return left(new CannotRefuelBecauseIsAtMaxError());
    }

    const gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      return left(new GameParamsNotFoundError());
    }

    const { shipRefuelCostInPercentage } = gameParams;

    const amountPayableInSpc = usedFuel * (shipRefuelCostInPercentage / 100);
    const replenished = ship.tankCapacity;

    if (amountPayableInSpc > resource.spc) {
      return left(new DontEnoughSpcAmountError());
    }

    resource.spc -= amountPayableInSpc;

    await this.resourcesRepository.save(resource);

    const { ship: updatedShip } = new Ship(
      {
        ...ship,
        canRefuelAtStation: false,
        fuel: replenished,
      },
      {
        id: ship.id,
        createdAt: ship.createdAt,
      },
    );

    await this.shipsRepository.save(updatedShip);

    return right({
      ship: updatedShip,
    });
  }
}

export { RefuelShipBusinessLogic };
