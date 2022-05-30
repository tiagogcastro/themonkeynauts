import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';
import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';
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
    const { monkeynaut, assign } = new Monkeynaut({
      avatar: null,

      baseHealth: 100,
      baseSpeed: 1,
      basePower: 1,
      baseResistence: 1,

      bonus,
      bonusValue: bonus_value,
      breedCount: breed_count,

      class: _class,
      rank,

      energy,
      health,
      maxEnergy: max_energy,

      name: 'xxx-xxx-xxx-xx',

      ownerId: player_id,
      playerId: player_id,

      power: 1,
      resistence: 1,
      speed: 1,
    });

    await this.monkeynautsRepository.create(monkeynaut);

    return monkeynaut;
  }
}

export { CreateMonkeynautBusinessLogic };
