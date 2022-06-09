import { inject, injectable } from 'tsyringe';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { ChangePlayerOwnerMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/change-player-owner-monkeynaut-request';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { AppError } from '@shared/errors/app-error';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class ChangePlayerOwnerMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,
  ) {}

  async execute({
    currentOwnerPlayerId,
    newOwerPlayerId,
    monkeynautId,
  }: ChangePlayerOwnerMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const foundCurrentOperatorPlayer = await this.playerRepository.findById(
      currentOwnerPlayerId,
    );

    if (!foundCurrentOperatorPlayer) {
      throw new AppError(
        'Current owner player from monkeynaut does not exist',
        404,
      );
    }

    const foundNewOwnerPlayer = await this.playerRepository.findById(
      newOwerPlayerId,
    );

    if (!foundNewOwnerPlayer) {
      throw new AppError('New player owner does not exist', 404);
    }

    const foundMonkeynaut = await this.monkeynautsRepository.findById(
      monkeynautId,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
    }

    if (currentOwnerPlayerId !== foundMonkeynaut.ownerId) {
      throw new AppError(
        'Current owner reported is different from owner in monkeynaut',
        403,
      );
    }

    const { monkeynaut } = new Monkeynaut(
      {
        ...foundMonkeynaut,
        ownerId: foundNewOwnerPlayer.id,
      },
      {
        id: foundMonkeynaut.id,
        createdAt: foundMonkeynaut.createdAt,
        updatedAt: new Date(),
      },
    );

    await this.monkeynautsRepository.save(monkeynaut);

    return monkeynaut;
  }
}

export { ChangePlayerOwnerMonkeynautBusinessLogic };
