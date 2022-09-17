import { inject, injectable } from 'tsyringe';

import {
  CreateMonkeynautBusinessLogic,
  CreateMonkeynautErrors,
} from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { MonkeynautRank } from '@modules/monkeynauts/domain/enums';
import { PackType } from '@modules/sales/domain/enums/pack-type';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { BuySaleItemRequestDTO } from '@modules/sales/dtos/buy-sale-item-request';
import {
  CreateShipBusinessLogic,
  CreateShipErrors,
} from '@modules/ships/core/business-logic/create-ship';
import { ShipRank } from '@modules/ships/domain/enums/ship-rank';
import {
  ConfirmTransactionErrors,
  IBlockchainProvider,
} from '@shared/domain/providers/blockchain-provider';
import { AppError } from '@shared/errors/app-error';
import { rarity } from '@shared/helpers';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Log } from '@modules/logs/domain/entities/log';
import { Either, left, right } from '@shared/core/logic/either';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { PlayerNotFoundError } from '@modules/players/core/business-logic/errors/player-not-fount-error';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { SaleIsEmptyError } from './errors/sale-is-empty-error';
import { SaleNotFoundError } from './errors/sale-not-found-error';
import { InvalidSaleStartDateError } from './errors/invalid-sale-start-date-error';
import { InvalidSaleEndDateError } from './errors/invalid-sale-end-date-error';
import { InvalidMonkeynautQuantityError } from './errors/invalid-monkeynaut-quantity-error';
import { InvalidShipQuantityError } from './errors/invalid-ship-quantity-error';
import { InvalidMonkeynautShipQuantityError } from './errors/invalid-monkeynaut-ship-quantity-error';

type PackMonkeynaut = {
  rank: MonkeynautRank;
};

type PackShip = {
  rank: ShipRank;
};

type Pack = {
  monkeynauts: PackMonkeynaut[];
  ships: PackShip[];
};

type BuySaleItemErrors = PlayerNotFoundError;

type BuySaleItemResponse = Either<
  | CreateMonkeynautErrors
  | CreateShipErrors
  | ConfirmTransactionErrors
  | BuySaleItemErrors,
  null
>;

@injectable()
class BuySaleItemBusinessLogic {
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

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,

    @inject('CreateMonkeynautBusinessLogic')
    private createMonkeynautBusinessLogic: CreateMonkeynautBusinessLogic,

    @inject('CreateShipBusinessLogic')
    private createShipBusinessLogic: CreateShipBusinessLogic,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    playerId,
    monkeynautSaleId,
    packSaleId,
    shipSaleId,
    txHash,
  }: BuySaleItemRequestDTO): Promise<BuySaleItemResponse> {
    const player = await this.playersRepository.findById(playerId);
    const currentDate = new Date();

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const ships = await this.shipsRepository.listAllShipsFromPlayer(player.id);

    if (!player.hasAsteroid && ships.length >= 1) {
      const [ship] = ships;

      const monkeynauts =
        await this.monkeynautsRepository.listAllMonkeynautsFromPlayer(
          player.id,
        );

      if (monkeynauts.length >= ship.crewCapacity) {
        return left(new InvalidMonkeynautQuantityError());
      }

      if (shipSaleId || packSaleId) {
        return left(new InvalidShipQuantityError());
      }
    }

    if (monkeynautSaleId) {
      if (!player.hasAsteroid && ships.length === 0) {
        return left(new InvalidMonkeynautShipQuantityError());
      }

      const monkeynautSale = await this.monkeynautSalesRepository.findById(
        monkeynautSaleId,
      );

      if (!monkeynautSale) {
        return left(new SaleNotFoundError('Monkeynaut'));
      }

      if (this.dateProvider.isBefore(currentDate, monkeynautSale.startDate)) {
        return left(new InvalidSaleStartDateError('monkeynaut'));
      }

      if (
        monkeynautSale.endDate &&
        this.dateProvider.isAfter(currentDate, monkeynautSale.endDate)
      ) {
        return left(new InvalidSaleEndDateError('monkeynaut'));
      }

      if (monkeynautSale.currentQuantityAvailable === 0) {
        return left(new SaleIsEmptyError('Monkeynaut'));
      }

      const monkeynautRank = await rarity({
        Private: monkeynautSale.private,
        Sergeant: monkeynautSale.sergeant,
        Captain: monkeynautSale.captain,
        Major: monkeynautSale.major,
      });

      const confirmTransactionResult =
        await this.blockchainProvider.confirmTransaction({
          amount: monkeynautSale.price,
          txHash,
          playerId: player.id,
          from: player.wallet as string,
        });

      if (confirmTransactionResult.isLeft()) {
        const error = confirmTransactionResult.value;

        return left(error);
      }

      monkeynautSale.currentQuantityAvailable -= 1;
      monkeynautSale.totalUnitsSold += 1;

      await this.monkeynautSalesRepository.update(monkeynautSale);

      const result = await this.createMonkeynautBusinessLogic.execute({
        ownerId: player.id,
        playerId: player.id,
        rank: monkeynautRank as MonkeynautRank,
      });

      if (result.isLeft()) {
        return left(result.value);
      }

      const { log } = new Log({
        action: `The player bought a monkeynaut. MONKEYNAUT_SALE_ID:${monkeynautSaleId}`,
        playerId: player.id,
        txHash,
      });

      await this.logsRepository.create(log);

      return right(null);
    }

    if (shipSaleId) {
      const shipSale = await this.shipSalesRepository.findById(shipSaleId);

      if (!shipSale) {
        return left(new SaleNotFoundError('Ship'));
      }

      if (shipSale.currentQuantityAvailable === 0) {
        return left(new SaleIsEmptyError('Ship'));
      }

      if (this.dateProvider.isBefore(currentDate, shipSale.startDate)) {
        return left(new InvalidSaleStartDateError('ship'));
      }

      if (
        shipSale.endDate &&
        this.dateProvider.isAfter(currentDate, shipSale.endDate)
      ) {
        return left(new InvalidSaleEndDateError('ship'));
      }

      const shipRank = await rarity({
        A: shipSale.rankA,
        B: shipSale.rankB,
        S: shipSale.rankS,
      });

      const confirmTransactionResult =
        await this.blockchainProvider.confirmTransaction({
          amount: shipSale.price,
          txHash,
          playerId: player.id,
          from: player.wallet as string,
        });

      if (confirmTransactionResult.isLeft()) {
        const error = confirmTransactionResult.value;

        return left(error);
      }

      const result = await this.createShipBusinessLogic.execute({
        ownerId: player.id,
        playerId: player.id,
        rank: shipRank as ShipRank,
      });

      if (result.isLeft()) {
        return left(result.value);
      }

      shipSale.currentQuantityAvailable -= 1;
      shipSale.totalUnitsSold += 1;

      await this.shipSalesRepository.update(shipSale);

      const { log } = new Log({
        action: `The player bought a ship. SHIP_SALE_ID:${shipSaleId}`,
        playerId: player.id,
        txHash,
      });

      await this.logsRepository.create(log);

      return right(null);
    }

    if (packSaleId) {
      const packSale = await this.packSalesRepository.findById(packSaleId);

      if (!packSale) {
        return left(new SaleNotFoundError('Pack'));
      }

      if (packSale.currentQuantityAvailable === 0) {
        return left(new SaleIsEmptyError('Pack'));
      }

      if (this.dateProvider.isBefore(currentDate, packSale.startDate)) {
        return left(new InvalidSaleStartDateError('pack'));
      }

      if (
        packSale.endDate &&
        this.dateProvider.isAfter(currentDate, packSale.endDate)
      ) {
        return left(new InvalidSaleEndDateError('pack'));
      }

      const confirmTransactionResult =
        await this.blockchainProvider.confirmTransaction({
          amount: packSale.price,
          txHash,
          playerId: player.id,
          from: player.wallet as string,
        });

      if (confirmTransactionResult.isLeft()) {
        const error = confirmTransactionResult.value;

        return left(error);
      }

      const packs: Record<PackType, Pack> = {
        Basic: {
          monkeynauts: [
            {
              rank: MonkeynautRank.Sergeant,
            },
            {
              rank: MonkeynautRank.Sergeant,
            },
          ],
          ships: [
            {
              rank: ShipRank.B,
            },
          ],
        },
        Advanced: {
          monkeynauts: [
            {
              rank: MonkeynautRank.Captain,
            },
            {
              rank: MonkeynautRank.Captain,
            },
            {
              rank: MonkeynautRank.Captain,
            },
          ],
          ships: [
            {
              rank: ShipRank.A,
            },
          ],
        },
        Expert: {
          monkeynauts: [
            {
              rank: MonkeynautRank.Major,
            },
            {
              rank: MonkeynautRank.Major,
            },
            {
              rank: MonkeynautRank.Major,
            },
            {
              rank: MonkeynautRank.Major,
            },
          ],
          ships: [
            {
              rank: ShipRank.S,
            },
          ],
        },
        Random: {
          monkeynauts: [
            {
              rank: await (async () => {
                const monkeynautRank = await rarity({
                  Private: 50,
                  Sergeant: 30,
                  Captain: 18,
                  Major: 2,
                });

                return monkeynautRank as MonkeynautRank;
              })(),
            },
            {
              rank: await (async () => {
                const monkeynautRank = await rarity({
                  Private: 50,
                  Sergeant: 30,
                  Captain: 18,
                  Major: 2,
                });

                return monkeynautRank as MonkeynautRank;
              })(),
            },
          ],
          ships: [
            {
              rank: await (async () => {
                const shipRank = await rarity({
                  B: 55,
                  A: 33,
                  S: 12,
                });

                return shipRank as ShipRank;
              })(),
            },
          ],
        },
      };

      const pack = packs[packSale.type];

      const shipPromises = pack.ships.map(ship => {
        return this.createShipBusinessLogic.execute({
          ownerId: player.id,
          playerId: player.id,
          rank: ship.rank,
        });
      });

      const createShipResults = await Promise.all([...shipPromises]);

      const createShipErrors = createShipResults.reduce(
        (previousErrors, createShipResult) => {
          if (createShipResult.isLeft()) {
            return [...previousErrors, createShipResult.value];
          }

          return previousErrors;
        },
        [] as CreateShipErrors[],
      );

      if (createShipErrors.length) {
        const [createShipError] = createShipErrors;

        return left(createShipError);
      }

      const monkeynautPromises = pack.monkeynauts.map(monkeynaut => {
        return this.createMonkeynautBusinessLogic.execute({
          ownerId: player.id,
          playerId: player.id,
          rank: monkeynaut.rank,
        });
      });

      const createMonkeynautResults = await Promise.all([
        ...monkeynautPromises,
      ]);

      const createMonkeynautErrors = createMonkeynautResults.reduce(
        (previousErrors, createMonkeynautResult) => {
          if (createMonkeynautResult.isLeft()) {
            return [...previousErrors, createMonkeynautResult.value];
          }

          return previousErrors;
        },
        [] as CreateMonkeynautErrors[],
      );

      if (createMonkeynautErrors.length) {
        const [createMonkeynautError] = createMonkeynautErrors;

        return left(createMonkeynautError);
      }

      packSale.currentQuantityAvailable -= 1;
      packSale.totalUnitsSold += 1;

      await this.packSalesRepository.update(packSale);

      const { log } = new Log({
        action: `The player bought a pack. PACK_SALE_ID:${packSaleId}`,
        playerId: player.id,
        txHash,
      });

      await this.logsRepository.create(log);
    }

    return right(null);
  }
}

export { BuySaleItemBusinessLogic };
