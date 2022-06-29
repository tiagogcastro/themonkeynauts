import { faker } from '@faker-js/faker';
import { inject, injectable } from 'tsyringe';

import { getRandomInt } from '@shared/helpers';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';

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
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class CreateMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

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
  }: CreateMonkeynautRequestDTO): Promise<IMonkeynaut> {
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
    }

    const roleRarity = _role || (await getRoleByRarity());
    const rankRarity = _rank || (await getRankByRarity());

    const maxEnergyBasedOnRank = {
      PRIVATE: 2,
      SERGEANT: 4,
      CAPTAIN: 6,
      MAJOR: 8,
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

    if (rankRarity !== 'PRIVATE') {
      switch (roleRarity) {
        case 'SOLDIER':
          attributes.power = Math.floor(
            baseAttributes.basePower + finalRankValue + finalroleValue,
          );
          break;
        case 'ENGINEER':
          attributes.resistence = Math.floor(
            baseAttributes.baseResistence + finalRankValue + finalroleValue,
          );
          break;
        case 'SCIENTIST':
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
      SOLDIER: 'Bounty Hunting Rewards',
      ENGINEER: 'Mining Rewards',
      SCIENTIST: 'Exploration Rewards',
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

    return monkeynaut;
  }
}

export { CreateMonkeynautBusinessLogic };
