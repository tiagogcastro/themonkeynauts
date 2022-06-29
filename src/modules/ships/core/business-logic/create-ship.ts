import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { ShipRank } from '@modules/ships/domain/enums/ship-rank';
import { ShipRole } from '@modules/ships/domain/enums/ship-role';
import { CreateShipRequestDTO } from '@modules/ships/dtos/create-ship-request';
import { AppError } from '@shared/errors/app-error';
import { generateSpaceName, rarity } from '@shared/helpers';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class CreateShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    ownerId,
    playerId,
    name,
    role,
    rank,
    bonusValue,
    bonusDescription,
    tankCapacity,
    crewCapacity,
    canRefuelAtStation,
    fuel,
    breedCount,
    onSale,
  }: CreateShipRequestDTO): Promise<IShip> {
    const player = await this.playersRepository.findById(ownerId);

    if (!player) {
      throw new AppError(
        'Could not create the ship because the player you entered to associate the ship does not exist',
        400,
      );
    }

    const percentage = 100 / 3;

    const _role =
      role ||
      (await rarity<Record<Lowercase<ShipRole>, number>>({
        explorer: percentage,
        miner: percentage,
        fighter: percentage,
      }));

    const _rank =
      rank ||
      (await rarity<Record<Lowercase<ShipRank>, number>>({
        a: 50,
        b: 35,
        s: 15,
      }));

    const _name = name || (await generateSpaceName());

    const _tankCapacity =
      tankCapacity ||
      {
        B: 200,
        A: 300,
        S: 400,
      }[_rank];

    const _fuel = fuel || _tankCapacity;

    const crewCapacitySchema: Record<ShipRank, number> = {
      B: 2,
      A: 3,
      S: 4,
    };

    const bonusValueSchema: Record<ShipRole, Record<ShipRank, number>> = {
      FIGHTER: {
        A: 30,
        B: 60,
        S: 100,
      },
      MINER: {
        A: 15,
        B: 30,
        S: 50,
      },
      EXPLORER: {
        A: 15,
        B: 30,
        S: 50,
      },
    };

    const _bonusDescription =
      bonusDescription ||
      {
        FIGHTER: 'Bounty Hunt Damage',
        MINER: 'Mining Success Rate',
        EXPLORER: 'Mission Time',
      }[_role];

    const _crewCapacity = crewCapacity ?? crewCapacitySchema[_rank];
    const _bonusValue = bonusValue ?? bonusValueSchema[_role][_rank];
    const _canRefuelAtStation = canRefuelAtStation || false;
    const _breedCount = breedCount ?? 0;
    const _onSale = onSale || false;

    const { ship } = new Ship({
      ownerId,
      playerId: playerId || ownerId,
      name: _name,
      role: _role,
      rank: _rank,
      fuel: _fuel,
      bonusValue: _bonusValue,
      bonusDescription: _bonusDescription,
      tankCapacity: _tankCapacity,
      crewCapacity: _crewCapacity,
      canRefuelAtStation: _canRefuelAtStation,
      breedCount: _breedCount,
      onSale: _onSale,
    });

    await this.shipsRepository.create(ship);

    const { log } = new Log({
      action: `Ship has created on player account. SHIP_ID:${ship.id}`,
      playerId: ownerId,
      txHash: null,
    });

    await this.logsRepository.create(log);

    return ship;
  }
}

export { CreateShipBusinessLogic };
