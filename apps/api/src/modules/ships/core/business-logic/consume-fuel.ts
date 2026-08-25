import { inject, injectable } from 'tsyringe';
import { Ship } from '@modules/ships/domain/entities/ship';

import { ShipNotFoundError } from '@modules/players/core/business-logic/errors/ship-not-fount-error';

import { Either, left, right } from '@shared/core/logic/either';

import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';
import { CannotConsumeFuelError } from './errors/cannot-consume-fuel';
import { GameParamsNotFoundError } from './errors/game-params-not-found-error';

export type ConsumeFuelRequestDTO = {
  shipId: string;
  playerIp: string;
  action: 'Travel' | 'BountyHunt';
};

type ConsumeFuelResponse = Either<
  ShipNotFoundError | CannotConsumeFuelError,
  {
    currentFuel: number;
    consumedNow: number;
  }
>;

@injectable()
class ConsumeFuelBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute({
    shipId,
    action,
  }: ConsumeFuelRequestDTO): Promise<ConsumeFuelResponse> {
    const ship = await this.shipsRepository.findById(shipId, false);

    if (!ship) {
      return left(new ShipNotFoundError());
    }

    const gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      return left(new GameParamsNotFoundError());
    }

    const { bountyHuntFuelConsuption, travelFuelConsuption } = gameParams;

    const consumeFuelSchema = {
      Travel: travelFuelConsuption,
      BountyHunt: bountyHuntFuelConsuption,
    };

    const consumeFuel = consumeFuelSchema[action];

    if (ship.fuel < consumeFuel) {
      return left(new CannotConsumeFuelError());
    }

    const fuel = ship.fuel - consumeFuel;

    const { ship: updatedShip } = new Ship(
      {
        ...ship,
        fuel,
      },
      {
        id: ship.id,
        createdAt: ship.createdAt,
      },
    );

    await this.shipsRepository.save(updatedShip);

    return right({
      currentFuel: fuel,
      consumedNow: consumeFuel,
    });
  }
}

export { ConsumeFuelBusinessLogic };
