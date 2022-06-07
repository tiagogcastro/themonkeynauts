import { inject, injectable } from 'tsyringe';

import { getRandomInt, rarity } from '@shared/helpers';

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

    player_id,
  }: CreateMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const baseHealth = getRandomInt(250, 350);
    const baseSpeed = getRandomInt(20, 50);
    const basePower = getRandomInt(20, 50);
    const baseResistence = getRandomInt(20, 50);

    const attributes = {
      health: baseHealth,
      speed: baseSpeed,
      power: basePower,
      resistence: baseResistence,
    };

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
          attributes.power = Math.floor(basePower + finalRank + finalClasse);
          break;
        case 'ENGINEER':
          attributes.resistence = Math.floor(
            baseResistence + finalRank + finalClasse,
          );
          break;
        case 'SCIENTIST':
          attributes.speed = Math.floor(baseSpeed + finalRank + finalClasse);
          break;
        default:
          break;
      }
    }

    const { monkeynaut } = new Monkeynaut({
      avatar: null,

      baseHealth,
      baseSpeed,
      basePower,
      baseResistence,

      ...attributes,

      bonus,
      bonusValue: bonus_value,
      breedCount: breed_count,

      class: _class || classe,
      rank: _rank || rank,

      energy,
      maxEnergy: max_energy,

      name: 'xxx-xxx-xxx-xx',

      ownerId: player_id,
      playerId: player_id,
    });

    await this.monkeynautsRepository.create(monkeynaut);

    return monkeynaut;
  }
}

export { CreateMonkeynautBusinessLogic };
