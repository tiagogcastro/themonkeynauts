import { inject, injectable } from 'tsyringe';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { UpdateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/update-monkeynaut-request';

import { AppError } from '@shared/errors/app-error';

import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class UpdateMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,
  ) {}

  async execute({
    bonus_value,
    bonus_description,

    breed_count,

    class: _class,
    rank: _rank,

    energy,
    max_energy,

    base_attributes: request_base_attributes,
    attributes: request_attributes,

    avatar,

    name,

    monkeynaut_id,

    player_id,
    owner_id,
  }: UpdateMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const foundOwnerPlayer = await this.playerRepository.findById(owner_id);

    if (!foundOwnerPlayer) {
      throw new AppError('The owner of this monkeynaut does not exist', 404);
    }

    const foundMonkeynaut = await this.monkeynautsRepository.findById(
      monkeynaut_id,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
    }

    if (foundMonkeynaut?.ownerId !== owner_id) {
      throw new AppError(
        'owner_id informed is different from owner_id in monkeynaut',
        403,
      );
    }

    if (player_id) {
      const foundOperatorPlayer = await this.playerRepository.findById(
        player_id,
      );

      if (!foundOperatorPlayer) {
        throw new AppError('player_id operator informed does not exist', 404);
      }
    }

    if (energy) {
      if (foundMonkeynaut.maxEnergy < energy) {
        throw new AppError(
          `Energy cannot be greater than maximum energy: ${foundMonkeynaut.maxEnergy}`,
          404,
        );
      }

      if (max_energy) {
        if (max_energy < energy) {
          throw new AppError(
            `New Energy value cannot be greater than maximum energy field: ${max_energy}`,
            404,
          );
        }
      }
    }

    const monkeynautUpdated = {
      bonusValue: bonus_value || foundMonkeynaut.bonusValue,
      bonusDescription: bonus_description || foundMonkeynaut.bonusDescription,

      breedCount: breed_count || foundMonkeynaut.breedCount,

      class: _class || foundMonkeynaut.class,
      rank: _rank || foundMonkeynaut.rank,

      energy: energy || foundMonkeynaut.energy,
      maxEnergy: max_energy || foundMonkeynaut.maxEnergy,

      baseHealth:
        request_base_attributes?.base_health || foundMonkeynaut.baseHealth,
      basePower:
        request_base_attributes?.base_power || foundMonkeynaut.basePower,
      baseResistence:
        request_base_attributes?.base_resistence ||
        foundMonkeynaut.baseResistence,
      baseSpeed:
        request_base_attributes?.base_speed || foundMonkeynaut.baseSpeed,

      health: request_attributes?.health || foundMonkeynaut.health,
      power: request_attributes?.power || foundMonkeynaut.power,
      resistence: request_attributes?.resistence || foundMonkeynaut.resistence,
      speed: request_attributes?.speed || foundMonkeynaut.speed,

      avatar: avatar || foundMonkeynaut.avatar,

      name: name || foundMonkeynaut.name,

      id: monkeynaut_id || foundMonkeynaut.id,

      playerId: player_id || foundMonkeynaut.playerId,
      ownerId: owner_id,
    };

    const { monkeynaut } = new Monkeynaut(
      {
        ...monkeynautUpdated,
      },
      {
        id: foundMonkeynaut.id,
        createdAt: foundMonkeynaut.createdAt,
        updatedAt: new Date(),
      },
    );

    await this.monkeynautsRepository.update(monkeynaut);

    return monkeynaut;
  }
}

export { UpdateMonkeynautBusinessLogic };
