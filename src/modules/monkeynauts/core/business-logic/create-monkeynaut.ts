import { inject, injectable } from 'tsyringe';

import { getRandomInt, getPercentageInt, rarity } from '@shared/helpers';

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
    const RANKS = {
      PRIVATE: { percentage: 0 },
      SERGEANT: { percentage: 15 },
      CAPTAIN: { percentage: 30 },
      MAJOR: { percentage: 45 },
    };

    const baseHealth = getRandomInt(250, 350);
    const baseSpeed = getRandomInt(20, 50);
    const basePower = getRandomInt(20, 50);
    const baseResistence = getRandomInt(20, 50);

    const classe = await rarity({
      soldier: 40,
      enginner: 30,
      scientist: 30,
    });

    const rank = await rarity({
      private: 50,
      sergeant: 30,
      captain: 15,
      major: 5,
    });

    const { percentage } = RANKS[rank];

    const attributesFinalValues = {
      health: getPercentageInt({
        percentage,
        value: baseHealth,
      }),
      speed: getPercentageInt({
        percentage,
        value: baseSpeed,
      }),
      power: getPercentageInt({
        percentage,
        value: basePower,
      }),
      resistence: getPercentageInt({
        percentage,
        value: baseResistence,
      }),
    };

    const { monkeynaut } = new Monkeynaut({
      avatar: null,

      baseHealth,
      baseSpeed,
      basePower,
      baseResistence,

      ...attributesFinalValues,

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
