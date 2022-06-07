import { inject, injectable } from 'tsyringe';

import { getPercentageInt, getRandomInt, rarity } from '@shared/helpers';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';

import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class CreateMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,
  ) {}

  async execute({
    bonus,
    bonus_value,

    breed_count,

    class: _class,
    rank: _rank,

    energy,
    max_energy,

    health: _health,
    speed: _speed,
    power: _power,
    resistence: _resistence,

    name,

    player_id,
  }: CreateMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const classe = await rarity({
      soldier: 40,
      engineer: 30,
      scientist: 30,
    });

    const rank = await rarity({
      private: 50,
      sergeant: 30,
      captain: 15,
      major: 5,
    });

    const ranksPercentage = {
      PRIVATE: 0,
      SERGEANT: 0.15,
      CAPTAIN: 0.3,
      MAJOR: 0.45,
    };

    const baseAttributes = {
      baseHealth: getRandomInt(250, 350),
      baseSpeed: getRandomInt(20, 50),
      basePower: getRandomInt(20, 50),
      baseResistence: getRandomInt(20, 50),
    };

    const { baseHealth, basePower, baseResistence, baseSpeed } = baseAttributes;

    const percentage = ranksPercentage[rank];

    const attributes = {
      health:
        baseHealth +
        getPercentageInt({
          percentage,
          value: baseHealth,
        }),
      speed:
        baseSpeed +
        getPercentageInt({
          percentage,
          value: baseSpeed,
        }),
      power:
        basePower +
        getPercentageInt({
          percentage,
          value: basePower,
        }),
      resistence:
        baseResistence +
        getPercentageInt({
          percentage,
          value: baseResistence,
        }),
    };

    const ranksSchema = {
      SOLDIER: {
        PRIVATE: basePower * 0,
        SERGEANT: basePower * 0.1,
        CAPTAIN: basePower * 0.2,
        MAJOR: basePower * 0.3,
      },
      ENGINEER: {
        PRIVATE: baseResistence * 0,
        SERGEANT: baseResistence * 0.1,
        CAPTAIN: baseResistence * 0.2,
        MAJOR: baseResistence * 0.3,
      },
      SCIENTIST: {
        PRIVATE: baseSpeed * 0,
        SERGEANT: baseSpeed * 0.1,
        CAPTAIN: baseSpeed * 0.2,
        MAJOR: baseSpeed * 0.3,
      },
    };

    const classesSchema = {
      SOLDIER: basePower * 0.1,
      ENGINEER: baseResistence * 0.2,
      SCIENTIST: baseSpeed * 0.3,
    };

    const finalRank = ranksSchema[_class || classe][_rank || rank];
    const finalClasse = classesSchema[_class || classe];

    if (rank !== 'PRIVATE') {
      switch (classe) {
        case 'SOLDIER':
          attributes.power = Math.floor(
            baseAttributes.basePower + finalRank + finalClasse,
          );
          break;
        case 'ENGINEER':
          attributes.resistence = Math.floor(
            baseAttributes.baseResistence + finalRank + finalClasse,
          );
          break;
        case 'SCIENTIST':
          attributes.speed = Math.floor(
            baseAttributes.baseSpeed + finalRank + finalClasse,
          );
          break;
        default:
          break;
      }
    }

    const { monkeynaut } = new Monkeynaut({
      avatar: null,

      baseHealth,
      basePower,
      baseResistence,
      baseSpeed,

      ...attributes,

      bonus,
      bonusValue: bonus_value,
      breedCount: breed_count,

      class: _class || classe,
      rank: _rank || rank,

      energy,
      maxEnergy: max_energy,

      name,

      ownerId: player_id,
      playerId: player_id,
    });

    await this.monkeynautsRepository.create(monkeynaut);

    return monkeynaut;
  }
}

export { CreateMonkeynautBusinessLogic };
