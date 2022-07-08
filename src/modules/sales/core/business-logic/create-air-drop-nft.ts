import { inject, injectable } from 'tsyringe';

import { Either, left, right } from '@shared/core/logic/either';

import { Log } from '@modules/logs/domain/entities/log';
import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';
import { IPlayer } from '@modules/players/domain/entities/player';
import { IShip } from '@modules/ships/domain/entities/ship';

import {
  MonkeynautRank,
  MonkeynautRole,
} from '@modules/monkeynauts/domain/enums';
import { ShipRank } from '@modules/ships/domain/enums/ship-rank';

import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';

import {
  getRankByRarity,
  getRoleByRarity,
} from '@modules/monkeynauts/config/create-monkeynaut';
import {
  getShipRankByRarity,
  getShipRoleByRarity,
} from '@modules/ships/config/create-ship';

import {
  CreateMonkeynautBusinessLogic,
  CreateMonkeynautErrors,
} from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import {
  CreateShipBusinessLogic,
  CreateShipErrors,
} from '@modules/ships/core/business-logic/create-ship';

import { ShipRole } from '@modules/ships/domain/enums/ship-role';
import { AirDropNftTypeNotAllowedError } from './errors/air-drop-nft-type-not-allowed-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';

type CreateAirDropNftResponse = Either<
  PlayerNotFoundError | AirDropNftTypeNotAllowedError,
  {
    monkeynauts: IMonkeynaut[];
    ships: IShip[];
  }
>;

export type CreateAirDropNftRequestDTO = {
  email: string;
  type: 'Monkeynaut' | 'Ship' | 'Pack';
  monkeynaut?: {
    rank?: MonkeynautRank | 'Random';
    role?: 'Random';
  };
  ship?: {
    rank?: ShipRank | 'Random';
    role?: 'Random';
  };
};

@injectable()
export class CreateAirDropNftBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('CreateMonkeynautBusinessLogic')
    private createMonkeynautBusinessLogic: CreateMonkeynautBusinessLogic,

    @inject('CreateShipBusinessLogic')
    private createShipBusinessLogic: CreateShipBusinessLogic,
  ) {}

  async execute({
    email,
    monkeynaut = {
      role: 'Random',
      rank: 'Random',
    },
    ship = {
      role: 'Random',
      rank: 'Random',
    },
    type,
  }: CreateAirDropNftRequestDTO): Promise<CreateAirDropNftResponse> {
    const repository = {
      monkeynauts: this.monkeynautsRepository,
      ships: this.shipsRepository,
      players: this.playersRepository,
      logs: this.logsRepository,
    };

    const player = await this.playersRepository.findByEmail(
      email.toLowerCase(),
    );

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    async function generateLogAfterCreate(message: string) {
      if (!player) {
        return left(new PlayerNotFoundError());
      }

      const { log } = new Log({
        action: message,
        playerId: player.id,
        txHash: null,
      });

      await repository.logs.create(log);
    }

    if (type === 'Monkeynaut') {
      let roleRarity = monkeynaut?.role as MonkeynautRole;
      let rankRarity = monkeynaut?.rank as MonkeynautRank;

      if (monkeynaut?.role === 'Random') {
        roleRarity = (await getRoleByRarity()) as MonkeynautRole;
      }

      if (monkeynaut?.rank === 'Random') {
        rankRarity = (await getRankByRarity()) as MonkeynautRank;
      }
      const result = await this.createMonkeynautBusinessLogic.execute({
        ownerId: player.id,
        rank: rankRarity,
        role: roleRarity as MonkeynautRole,
      });

      if (result.isLeft()) {
        return left(result.value);
      }

      const monkeynautCreated = result.value.monkeynaut;

      generateLogAfterCreate(`Sent 1 monkeynaut by air drop nft`);

      return right({
        monkeynauts: [monkeynautCreated],
        ships: [],
      });
    }

    if (type === 'Ship') {
      let roleRarity = ship?.role as ShipRole;
      let rankRarity = ship?.rank as ShipRank;

      if (ship?.role === 'Random') {
        roleRarity = (await getShipRoleByRarity()) as ShipRole;
      }

      if (ship?.rank === 'Random') {
        rankRarity = (await getShipRankByRarity()) as ShipRank;
      }
      const result = await this.createShipBusinessLogic.execute({
        ownerId: player.id,
        rank: rankRarity,
        role: roleRarity,
      });

      if (result.isLeft()) {
        return left(result.value);
      }

      const shipCreated = result.value.ship;

      generateLogAfterCreate(`Sent 1 ship by air drop nft`);

      return right({
        monkeynauts: [],
        ships: [shipCreated],
      });
    }
    const self = this;

    async function createMonkeynautFromPack(_player: IPlayer) {
      const _monkeynaut = await self.createMonkeynautBusinessLogic.execute({
        ownerId: _player.id,
      });

      return _monkeynaut;
    }

    async function createShipFromPack(_player: IPlayer) {
      const _ship = await self.createShipBusinessLogic.execute({
        ownerId: _player.id,
      });

      return _ship;
    }

    const toArray = (length: number) => {
      return Array.from(
        {
          length,
        },
        (value, key) => key + 1,
      );
    };

    if (type === 'Pack') {
      const packAmount = {
        monkeynauts: 2,
        ships: 1,
      };

      const pack = {
        monkeynauts: toArray(packAmount.monkeynauts),
        ships: toArray(packAmount.ships),
      };

      const shipPromises = pack.ships.map(() => {
        return createShipFromPack(player);
      });

      await Promise.all([...shipPromises]);

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

      const ships = createShipResults.reduce(
        (previousShips, createShipResult) => {
          if (createShipResult.isRight()) {
            return [...previousShips, createShipResult.value.ship];
          }

          return previousShips;
        },
        [] as IShip[],
      );

      const monkeynautPromises = pack.monkeynauts.map(() => {
        return createMonkeynautFromPack(player);
      });

      await Promise.all([...monkeynautPromises]);

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
      const monkeynauts = createMonkeynautResults.reduce(
        (previousMonkeynauts, createMonkeynautResult) => {
          if (createMonkeynautResult.isRight()) {
            return [
              ...previousMonkeynauts,
              createMonkeynautResult.value.monkeynaut,
            ];
          }

          return previousMonkeynauts;
        },
        [] as IMonkeynaut[],
      );

      generateLogAfterCreate(
        `Sent ${packAmount.monkeynauts} monkeynaut and ${packAmount.ships} ships from air drop nft`,
      );

      return right({
        monkeynauts,
        ships,
      });
    }

    return left(new AirDropNftTypeNotAllowedError());
  }
}
