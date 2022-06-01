import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';
import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';
import { getRandomInt } from '@shared/helpers/get-random-int';
import { inject, injectable } from 'tsyringe';
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
    rank,
    energy,
    health,
    max_energy,
    player_id,
  }: CreateMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const baseHealth = getRandomInt(250, 350);
    const baseSpeed = getRandomInt(20, 50);
    const basePower = getRandomInt(20, 50);
    const baseResistence = getRandomInt(20, 50);

    // const rank = getRandomInt(20, 50);

    const { monkeynaut, assign } = new Monkeynaut({
      avatar: null,

      baseHealth,
      baseSpeed,
      basePower,
      baseResistence,

      power: 1,
      resistence: 1,
      speed: 1,
      health,

      bonus,
      bonusValue: bonus_value,
      breedCount: breed_count,

      class: _class,
      rank,

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
