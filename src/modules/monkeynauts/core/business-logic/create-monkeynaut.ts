import { faker } from '@faker-js/faker';
import { inject, injectable } from 'tsyringe';

import { getRandomInt } from '@shared/helpers';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import {
  getAttributesByBase,
  getBonusValueByRoleAndRank,
  getRoleByRarity,
  getRoleSchema,
  getRankByRarity,
  getRanksSchema,
  ranksPercentageToBonus,
} from '@modules/monkeynauts/config/create-monkeynaut';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';

import { AppError } from '@shared/errors/app-error';

import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { InvalidMonkeynautShipQuantityError } from '@modules/sales/core/business-logic/errors/invalid-monkeynaut-ship-quantity-error';
import { Either, left, right } from '@shared/core/logic/either';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { CommomsMonkeynautProps } from '@modules/monkeynauts/dtos/commons-monkeynaut-props';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

export type CreateMonkeynautRequestDTO = CommomsMonkeynautProps & {
  ownerId: string;
};

type CreateMonkeynautResponse = Either<
  InvalidMonkeynautShipQuantityError,
  {
    monkeynaut: IMonkeynaut;
  }
>;

@injectable()
class CreateMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    bonusValue,
    bonusDescription,

    breedCount,

    role: _role,
    rank: _rank,

    energy,
    maxEnergy,

    baseAttributes: request_base_attributes,

    name,

    playerId,
    ownerId,
  }: CreateMonkeynautRequestDTO): Promise<CreateMonkeynautResponse> {
    const foundOwnerMonkeynautPlayer = await this.playersRepository.findById(
      ownerId,
    );

    if (!foundOwnerMonkeynautPlayer) {
      throw new AppError('ownerId field informed does not exist', 404);
    }
    if (playerId) {
      const foundPlayer = await this.playersRepository.findById(playerId);

      if (!foundPlayer) {
        throw new AppError('playerId field informed does not exist', 404);
      }

      const ships = await this.shipsRepository.listAllShipsFromPlayer(playerId);

      if (!foundPlayer.hasAsteroid && ships.length === 0) {
        return left(new InvalidMonkeynautShipQuantityError());
      }
    }

    const ships = await this.shipsRepository.listAllShipsFromPlayer(ownerId);

    if (!foundOwnerMonkeynautPlayer.hasAsteroid && ships.length === 0) {
      return left(new InvalidMonkeynautShipQuantityError());
    }

    const roleRarity = _role || (await getRoleByRarity());
    const rankRarity = _rank || (await getRankByRarity());

    const maxEnergyBasedOnRank = {
      Private: 2,
      Sergeant: 4,
      Captain: 6,
      Major: 8,
    };

    const maxEnergyBase = maxEnergy || maxEnergyBasedOnRank[rankRarity];
    const initialEnergyValue = energy || maxEnergyBase;

    if (energy) {
      if (maxEnergyBase < energy) {
        throw new AppError(
          `Energy value(${energy}) cannot be greater than maximum energy field: ${maxEnergyBase}`,
          403,
        );
      }
    }

    const baseAttributes = {
      baseHealth: request_base_attributes?.baseHealth || getRandomInt(250, 350),
      baseSpeed: request_base_attributes?.baseSpeed || getRandomInt(20, 50),
      basePower: request_base_attributes?.basePower || getRandomInt(20, 50),
      baseResistence:
        request_base_attributes?.baseResistence || getRandomInt(20, 50),
    };

    const percentageToBonus = ranksPercentageToBonus[rankRarity];

    const attributes = getAttributesByBase({
      ...baseAttributes,
      percentage: percentageToBonus,
    });

    const ranksSchema = getRanksSchema(baseAttributes);
    const roleSchema = getRoleSchema(baseAttributes);

    const finalRankValue = ranksSchema[roleRarity][rankRarity];
    const finalroleValue = roleSchema[roleRarity];

    if (rankRarity !== 'Private') {
      switch (roleRarity) {
        case 'Soldier':
          attributes.power = Math.floor(
            baseAttributes.basePower + finalRankValue + finalroleValue,
          );
          break;
        case 'Engineer':
          attributes.resistence = Math.floor(
            baseAttributes.baseResistence + finalRankValue + finalroleValue,
          );
          break;
        case 'Scientist':
          attributes.speed = Math.floor(
            baseAttributes.baseSpeed + finalRankValue + finalroleValue,
          );
          break;
        default:
          break;
      }
    }

    const _name = name || faker.name.findName();

    const bonusDescriptionBaseadRole = {
      Soldier: 'Bounty Hunting Rewards',
      Engineer: 'Mining Rewards',
      Scientist: 'Exploration Rewards',
    };

    const bonusValueBaseadRank =
      getBonusValueByRoleAndRank()[roleRarity][rankRarity];

    const { monkeynaut } = new Monkeynaut({
      ...baseAttributes,

      ...attributes,

      bonusDescription:
        bonusDescription || bonusDescriptionBaseadRole[roleRarity],
      bonusValue: bonusValue || bonusValueBaseadRank,
      breedCount: breedCount || 0,

      role: roleRarity,
      rank: rankRarity,

      energy: initialEnergyValue,
      maxEnergy: maxEnergyBase,

      name: _name,

      ownerId,
      playerId: playerId || ownerId,
    });

    await this.monkeynautsRepository.create(monkeynaut);

    const { log } = new Log({
      action: `Monkeynaut has created on player account. MONKEYNAUT_ID:${monkeynaut.id}`,
      playerId: ownerId,
      txHash: null,
    });

    await this.logsRepository.create(log);

    return right({
      monkeynaut,
    });
  }
}

export { CreateMonkeynautBusinessLogic };
