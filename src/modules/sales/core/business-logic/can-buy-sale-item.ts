import { inject, injectable } from 'tsyringe';

import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { Either, right } from '@shared/core/logic/either';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { Maybe } from '@shared/core/logic/maybe';

export type CanBuySaleItemRequestDTO = {
  playerId: string;
  shipSaleId: string;
  monkeynautSaleId: string;
  packSaleId: string;
};

type CanBuySaleItemResponse = Either<
  Error,
  {
    canBuySaleItem: boolean;
    reason: Maybe<string>;
  }
>;

@injectable()
class CanBuySaleItemBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,

    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,

    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    playerId,
    shipSaleId,
    monkeynautSaleId,
    packSaleId,
  }: CanBuySaleItemRequestDTO): Promise<CanBuySaleItemResponse> {
    const player = await this.playersRepository.findById(playerId);
    const currentDate = new Date();

    if (!player) {
      return right({ canBuySaleItem: false, reason: 'Player not found' });
    }

    const ships = await this.shipsRepository.listAllShipsFromPlayer(player.id);

    if (!player.hasAsteroid && ships.length >= 1) {
      const [ship] = ships;

      const monkeynauts =
        await this.monkeynautsRepository.listAllMonkeynautsFromPlayer(
          player.id,
        );

      if (monkeynauts.length >= ship.crewCapacity) {
        return right({
          canBuySaleItem: false,
          reason:
            'You have reached the maximum number of monkeynauts, buy an asteroid to buy more items',
        });
      }

      if (shipSaleId || packSaleId) {
        return right({
          canBuySaleItem: false,
          reason:
            'You have reached the maximum number of ships, buy an asteroid to buy more items',
        });
      }
    }

    if (monkeynautSaleId) {
      if (!player.hasAsteroid && ships.length === 0) {
        return right({
          canBuySaleItem: false,
          reason: 'It is necessary to buy a ship before buying monkeynaut',
        });
      }

      const monkeynautSale = await this.monkeynautSalesRepository.findById(
        monkeynautSaleId,
      );

      if (!monkeynautSale) {
        return right({
          canBuySaleItem: false,
          reason: 'Monkeynaut sale not found',
        });
      }

      if (this.dateProvider.isBefore(currentDate, monkeynautSale.startDate)) {
        return right({
          canBuySaleItem: false,
          reason: `The monkeynaut sale hasn't started yet`,
        });
      }

      if (
        monkeynautSale.endDate &&
        this.dateProvider.isAfter(currentDate, monkeynautSale.endDate)
      ) {
        return right({
          canBuySaleItem: false,
          reason: `The monkeynaut sale has ended`,
        });
      }

      if (monkeynautSale.currentQuantityAvailable === 0) {
        return right({
          canBuySaleItem: false,
          reason: 'Monkeynaut sale is empty',
        });
      }

      return right({
        canBuySaleItem: true,
        reason: null,
      });
    }

    if (shipSaleId) {
      const shipSale = await this.shipSalesRepository.findById(shipSaleId);

      if (!shipSale) {
        return right({ canBuySaleItem: false, reason: 'Ship sale not found' });
      }

      if (shipSale.currentQuantityAvailable === 0) {
        return right({ canBuySaleItem: false, reason: 'Ship sale is empty' });
      }

      if (this.dateProvider.isBefore(currentDate, shipSale.startDate)) {
        return right({
          canBuySaleItem: false,
          reason: `The ship sale hasn't started yet`,
        });
      }

      if (
        shipSale.endDate &&
        this.dateProvider.isAfter(currentDate, shipSale.endDate)
      ) {
        return right({
          canBuySaleItem: false,
          reason: `The ship sale has ended`,
        });
      }

      return right({ canBuySaleItem: true, reason: null });
    }

    if (packSaleId) {
      const packSale = await this.packSalesRepository.findById(packSaleId);

      if (!packSale) {
        return right({ canBuySaleItem: false, reason: 'Pack sale not found' });
      }

      if (packSale.currentQuantityAvailable === 0) {
        return right({ canBuySaleItem: false, reason: 'Pack sale is empty' });
      }

      if (this.dateProvider.isBefore(currentDate, packSale.startDate)) {
        return right({
          canBuySaleItem: false,
          reason: `The pack sale hasn't started yet`,
        });
      }

      if (
        packSale.endDate &&
        this.dateProvider.isAfter(currentDate, packSale.endDate)
      ) {
        return right({
          canBuySaleItem: false,
          reason: `The pack sale has ended`,
        });
      }

      return right({ canBuySaleItem: true, reason: null });
    }

    return right({ canBuySaleItem: true, reason: null });
  }
}

export { CanBuySaleItemBusinessLogic };
