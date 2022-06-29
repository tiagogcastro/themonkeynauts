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

import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';

import { ShipRole } from '@modules/ships/domain/enums/ship-role';
import { AirDropNftTypeNotAllowedError } from './errors/air-drop-nft-type-not-allowed-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';

type CreateAirDropNftResponse = Either<
  PlayerNotFoundError | AirDropNftTypeNotAllowedError,
  {
    monkeynauts: IMonkeynaut[] | null;
    ships: IShip[] | null;
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

    const player = await this.playersRepository.findByEmail(email);

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
      const createMonkeynautLogic = new CreateMonkeynautBusinessLogic(
        repository.monkeynauts,
        repository.players,
        repository.logs,
      );

      let roleRarity = monkeynaut?.role as MonkeynautRole;
      let rankRarity = monkeynaut?.rank as MonkeynautRank;

      if (monkeynaut?.role === 'Random') {
        roleRarity = (await getRoleByRarity()) as MonkeynautRole;
      }

      if (monkeynaut?.rank === 'Random') {
        rankRarity = (await getRankByRarity()) as MonkeynautRank;
      }
      const monkeynautCreated = await createMonkeynautLogic.execute({
        ownerId: player.id,
        rank: rankRarity,
        role: roleRarity as MonkeynautRole,
      });

      generateLogAfterCreate(`Sent 1 monkeynaut by air drop nft`);

      return right({
        monkeynauts: [monkeynautCreated],
        ships: null,
      });
    }

    if (type === 'Ship') {
      const createShipLogic = new CreateShipBusinessLogic(
        repository.ships,
        repository.players,
        repository.logs,
      );

      let roleRarity = ship?.role as ShipRole;
      let rankRarity = ship?.rank as ShipRank;

      if (ship?.role === 'Random') {
        roleRarity = (await getShipRoleByRarity()) as ShipRole;
      }

      if (ship?.rank === 'Random') {
        rankRarity = (await getShipRankByRarity()) as ShipRank;
      }
      const shipCreated = await createShipLogic.execute({
        ownerId: player.id,
        rank: rankRarity,
        role: roleRarity,
      });

      generateLogAfterCreate(`Sent 1 ship by air drop nft`);

      return right({
        monkeynauts: null,
        ships: [shipCreated],
      });
    }

    async function createMonkeynautFromPack(
      _player: IPlayer,
      createMonkeynautLogic: CreateMonkeynautBusinessLogic,
    ) {
      const _monkeynaut = await createMonkeynautLogic.execute({
        ownerId: _player.id,
      });

      return _monkeynaut;
    }

    async function createShipFromPack(
      _player: IPlayer,
      createShipLogic: CreateShipBusinessLogic,
    ) {
      const _ship = await createShipLogic.execute({
        ownerId: _player.id,
      });

      return _ship;
    }

    if (type === 'Pack') {
      const createMonkeynautLogic = new CreateMonkeynautBusinessLogic(
        repository.monkeynauts,
        repository.players,
        repository.logs,
      );

      const createShipLogic = new CreateShipBusinessLogic(
        repository.ships,
        repository.players,
        repository.logs,
      );

      const packAmount = {
        monkeynauts: 2,
        ships: 1,
      };

      const _monkeynauts: Promise<IMonkeynaut>[] = [];
      const _ships: Promise<IShip>[] = [];

      for (let index = 0; index < packAmount.monkeynauts; index++) {
        const result = createMonkeynautFromPack(player, createMonkeynautLogic);

        _monkeynauts.push(result);
      }

      for (let index = 0; index < packAmount.ships; index++) {
        const result = createShipFromPack(player, createShipLogic);

        _ships.push(result);
      }

      const monkeynautsCreated = await Promise.all(_monkeynauts);
      const shipsCreated = await Promise.all(_ships);

      generateLogAfterCreate(
        `Sent ${packAmount.monkeynauts} monkeynaut and ${packAmount.ships} ships from air drop nft`,
      );

      return right({
        monkeynauts: monkeynautsCreated,
        ships: shipsCreated,
      });
    }

    return left(new AirDropNftTypeNotAllowedError());
  }
}
