import { inject, injectable } from 'tsyringe';

import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { Either, right } from '@shared/core/logic/either';
import { IDateProvider } from '@shared/domain/providers/date-provider';

export type CanBuySaleItemRequestDTO = {
  playerId: string;
  shipSaleId: string;
  monkeynautSaleId: string;
  packSaleId: string;
};

type CanBuySaleItemResponse = Either<Error, boolean>;

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
      return right(false);
    }

    const ships = await this.shipsRepository.listAllShipsFromPlayer(player.id);

    if (!player.hasAsteroid && ships.length >= 1) {
      const [ship] = ships;

      const monkeynauts =
        await this.monkeynautsRepository.listAllMonkeynautsFromPlayer(
          player.id,
        );

      if (monkeynauts.length >= ship.crewCapacity) {
        return right(false);
      }

      if (shipSaleId || packSaleId) {
        return right(false);
      }
    }

    if (monkeynautSaleId) {
      if (!player.hasAsteroid && ships.length === 0) {
        return right(false);
      }

      const monkeynautSale = await this.monkeynautSalesRepository.findById(
        monkeynautSaleId,
      );

      if (!monkeynautSale) {
        return right(false);
      }

      if (this.dateProvider.isBefore(currentDate, monkeynautSale.startDate)) {
        return right(false);
      }

      if (
        monkeynautSale.endDate &&
        this.dateProvider.isAfter(currentDate, monkeynautSale.endDate)
      ) {
        return right(false);
      }

      if (monkeynautSale.currentQuantityAvailable === 0) {
        return right(false);
      }

      return right(true);
    }

    if (shipSaleId) {
      const shipSale = await this.shipSalesRepository.findById(shipSaleId);

      if (!shipSale) {
        return right(false);
      }

      if (shipSale.currentQuantityAvailable === 0) {
        return right(false);
      }

      if (this.dateProvider.isBefore(currentDate, shipSale.startDate)) {
        return right(false);
      }

      if (
        shipSale.endDate &&
        this.dateProvider.isAfter(currentDate, shipSale.endDate)
      ) {
        return right(false);
      }

      return right(true);
    }

    if (packSaleId) {
      const packSale = await this.packSalesRepository.findById(packSaleId);

      if (!packSale) {
        return right(false);
      }

      if (packSale.currentQuantityAvailable === 0) {
        return right(false);
      }

      if (this.dateProvider.isBefore(currentDate, packSale.startDate)) {
        return right(false);
      }

      if (
        packSale.endDate &&
        this.dateProvider.isAfter(currentDate, packSale.endDate)
      ) {
        return right(false);
      }

      return right(true);
    }

    return right(false);
  }
}

export { CanBuySaleItemBusinessLogic };
