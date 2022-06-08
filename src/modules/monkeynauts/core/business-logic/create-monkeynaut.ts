import { inject, injectable } from 'tsyringe';
import { faker } from '@faker-js/faker';

import { getRandomInt } from '@shared/helpers';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';

import {
  getAttributesByBase,
  getClassByRarity,
  getRankByRarity,
  getRanksSchema,
  ranksPercentageToBonus,
} from '@modules/monkeynauts/config/create-monkeynaut';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class CreateMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,
  ) {}

  async execute({
    bonusValue,
    bonusDescription,

    breedCount,

    class: _class,
    rank: _rank,

    energy,
    maxEnergy,

    baseAttributes: request_base_attributes,

    name,

    playerId,
  }: CreateMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const classRarity = _class || (await getClassByRarity());
    const rankRarity = _rank || (await getRankByRarity());

    const baseAttributes = {
      baseHealth: request_base_attributes?.baseHealth || getRandomInt(250, 350),
      baseSpeed: request_base_attributes?.baseSpeed || getRandomInt(20, 50),
      basePower: request_base_attributes?.basePower || getRandomInt(20, 50),
      baseResistence:
        request_base_attributes?.baseResistence || getRandomInt(20, 50),
    };

    const { basePower, baseResistence, baseSpeed } = baseAttributes;

    const percentageToBonus = ranksPercentageToBonus[rankRarity];

    const attributes = getAttributesByBase({
      ...baseAttributes,
      percentage: percentageToBonus,
    });

    const ranksSchema = getRanksSchema(baseAttributes);

    const classesSchema = {
      SOLDIER: basePower * 0.1,
      ENGINEER: baseResistence * 0.2,
      SCIENTIST: baseSpeed * 0.3,
    };

    const finalRankValue = ranksSchema[classRarity][rankRarity];
    const finalClassValue = classesSchema[classRarity];

    if (rankRarity !== 'PRIVATE') {
      switch (classRarity) {
        case 'SOLDIER':
          attributes.power = Math.floor(
            baseAttributes.basePower + finalRankValue + finalClassValue,
          );
          break;
        case 'ENGINEER':
          attributes.resistence = Math.floor(
            baseAttributes.baseResistence + finalRankValue + finalClassValue,
          );
          break;
        case 'SCIENTIST':
          attributes.speed = Math.floor(
            baseAttributes.baseSpeed + finalRankValue + finalClassValue,
          );
          break;
        default:
          break;
      }
    }

    const _name = name || faker.name.findName();

    const { monkeynaut } = new Monkeynaut({
      avatar: null,

      ...baseAttributes,

      ...attributes,

      bonusDescription,
      bonusValue,
      breedCount,

      class: classRarity,
      rank: rankRarity,

      energy,
      maxEnergy,

      name: _name,

      ownerId: playerId,
      playerId,
    });

    await this.monkeynautsRepository.create(monkeynaut);

    return monkeynaut;
  }
}

export { CreateMonkeynautBusinessLogic };
