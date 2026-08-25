import { inject, injectable } from 'tsyringe';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { AppError } from '@shared/errors/app-error';
import { Either, right } from '@shared/core/logic/either';

import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

export type ChangePlayerOwnerMonkeynautRequestDTO = {
  playerLoggedId: string;
  newOwerPlayerId: string;
  monkeynautId: string;
};

type ChangePlayerOwnerMonkeynautResponse = Either<
  Error,
  {
    monkeynaut: IMonkeynaut;
  }
>;

@injectable()
class ChangePlayerOwnerMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,
  ) {}

  async execute({
    playerLoggedId,
    newOwerPlayerId,
    monkeynautId,
  }: ChangePlayerOwnerMonkeynautRequestDTO): Promise<ChangePlayerOwnerMonkeynautResponse> {
    const foundCurrentOperatorPlayer = await this.playerRepository.findById(
      playerLoggedId,
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

    if (playerLoggedId !== foundMonkeynaut.ownerId) {
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

    return right({ monkeynaut });
  }
}

export { ChangePlayerOwnerMonkeynautBusinessLogic };
