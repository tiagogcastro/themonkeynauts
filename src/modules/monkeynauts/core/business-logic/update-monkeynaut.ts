import { inject, injectable } from 'tsyringe';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { UpdateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/update-monkeynaut-request';

import { AppError } from '@shared/errors/app-error';
import { Either, right } from '@shared/core/logic/either';

import { updateProps } from '@shared/helpers/update-props';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

type UpdateMonkeynautResponse = Either<
  Error,
  {
    monkeynaut: IMonkeynaut;
  }
>;

@injectable()
class UpdateMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,
  ) {}

  async execute(
    data: UpdateMonkeynautRequestDTO,
  ): Promise<UpdateMonkeynautResponse> {
    const { energy, maxEnergy, monkeynautId, playerId, ownerId } = data;

    const foundOwnerPlayer = await this.playerRepository.findById(ownerId);

    if (!foundOwnerPlayer) {
      throw new AppError('The owner of this monkeynaut does not exist', 404);
    }

    const foundMonkeynaut = await this.monkeynautsRepository.findById(
      monkeynautId,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
    }

    if (foundMonkeynaut?.ownerId !== ownerId) {
      throw new AppError(
        'ownerId informed is different from ownerId in monkeynaut',
        403,
      );
    }

    if (playerId) {
      const foundOperatorPlayer = await this.playerRepository.findById(
        playerId,
      );

      if (!foundOperatorPlayer) {
        throw new AppError('playerId operator informed does not exist', 404);
      }
    }

    if (energy) {
      if (foundMonkeynaut.maxEnergy < energy) {
        throw new AppError(
          `Energy cannot be greater than maximum energy: ${foundMonkeynaut.maxEnergy}`,
          403,
        );
      }

      if (maxEnergy) {
        if (maxEnergy < energy) {
          throw new AppError(
            `New Energy value cannot be greater than maximum energy field: ${maxEnergy}`,
            403,
          );
        }
      }
    }

    const updateData = updateProps(data);

    const { monkeynaut } = new Monkeynaut(
      {
        ...foundMonkeynaut,
        ...updateData,
      },
      {
        id: foundMonkeynaut.id,
        createdAt: foundMonkeynaut.createdAt,
        updatedAt: new Date(),
      },
    );

    await this.monkeynautsRepository.update(monkeynaut);

    return right({
      monkeynaut,
    });
  }
}

export { UpdateMonkeynautBusinessLogic };
