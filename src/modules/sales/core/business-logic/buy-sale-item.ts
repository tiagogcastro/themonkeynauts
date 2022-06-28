import { inject, injectable } from 'tsyringe';

import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { MonkeynautRank } from '@modules/monkeynauts/domain/enums';
import { PackType } from '@modules/sales/domain/enums/pack-type';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { BuySaleItemRequestDTO } from '@modules/sales/dtos/buy-sale-item-request';
import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';
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
import { SaleIsEmptyError } from './errors/sale-is-empty-error';
import { SaleNotFoundError } from './errors/sale-not-found-error';
import { InvalidSaleStartDateError } from './errors/invalid-sale-start-date-error';
import { InvalidSaleEndDateError } from './errors/invalid-sale-end-date-error';

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

type BuySaleItemResponse = Either<
  ConfirmTransactionErrors | PlayerNotFoundError,
  null
>;

@injectable()
class BuySaleItemBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,

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

    if (monkeynautSaleId) {
      const monkeynautSale = await this.monkeynautSalesRepository.findById(
        monkeynautSaleId,
      );

      if (!monkeynautSale) {
        return left(new SaleIsEmptyError('Monkeynaut'));
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
        private: monkeynautSale.private,
        sergeant: monkeynautSale.sergeant,
        captain: monkeynautSale.captain,
        major: monkeynautSale.major,
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

      await this.createMonkeynautBusinessLogic.execute({
        ownerId: player.id,
        playerId: player.id,
        rank: monkeynautRank as MonkeynautRank,
      });

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
        a: shipSale.rankA,
        b: shipSale.rankB,
        s: shipSale.rankS,
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

      await this.createShipBusinessLogic.execute({
        ownerId: player.id,
        playerId: player.id,
        rank: shipRank as ShipRank,
      });

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
        BASIC: {
          monkeynauts: [
            {
              rank: MonkeynautRank.SERGEANT,
            },
            {
              rank: MonkeynautRank.SERGEANT,
            },
          ],
          ships: [
            {
              rank: ShipRank.B,
            },
          ],
        },
        ADVANCED: {
          monkeynauts: [
            {
              rank: MonkeynautRank.CAPTAIN,
            },
            {
              rank: MonkeynautRank.CAPTAIN,
            },
            {
              rank: MonkeynautRank.CAPTAIN,
            },
          ],
          ships: [
            {
              rank: ShipRank.A,
            },
          ],
        },
        EXPERT: {
          monkeynauts: [
            {
              rank: MonkeynautRank.MAJOR,
            },
            {
              rank: MonkeynautRank.MAJOR,
            },
            {
              rank: MonkeynautRank.MAJOR,
            },
            {
              rank: MonkeynautRank.MAJOR,
            },
          ],
          ships: [
            {
              rank: ShipRank.S,
            },
          ],
        },
        RANDOM: {
          monkeynauts: [
            {
              rank: await (async () => {
                const monkeynautRank = await rarity({
                  private: 50,
                  sergeant: 30,
                  captain: 18,
                  major: 2,
                });

                return monkeynautRank as MonkeynautRank;
              })(),
            },
            {
              rank: await (async () => {
                const monkeynautRank = await rarity({
                  private: 50,
                  sergeant: 30,
                  captain: 18,
                  major: 2,
                });

                return monkeynautRank as MonkeynautRank;
              })(),
            },
          ],
          ships: [
            {
              rank: await (async () => {
                const shipRank = await rarity({
                  b: 55,
                  a: 33,
                  s: 12,
                });

                return shipRank as ShipRank;
              })(),
            },
          ],
        },
      };

      const pack = packs[packSale.type];

      const monkeynauts = pack.monkeynauts.map(monkeynaut => {
        return this.createMonkeynautBusinessLogic.execute({
          ownerId: player.id,
          playerId: player.id,
          rank: monkeynaut.rank,
        });
      });

      const ships = pack.ships.map(ship => {
        return this.createShipBusinessLogic.execute({
          ownerId: player.id,
          playerId: player.id,
          rank: ship.rank,
        });
      });

      await Promise.all([...monkeynauts, ...ships]);

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
