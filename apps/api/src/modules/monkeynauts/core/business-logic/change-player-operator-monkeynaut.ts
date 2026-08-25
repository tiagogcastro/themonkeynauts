import { inject, injectable } from 'tsyringe';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { AppError } from '@shared/errors/app-error';
import { Either, right } from '@shared/core/logic/either';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

export type ChangePlayerOperatorMonkeynautRequestDTO = {
  playerLoggedId: string;
  newOperatorPlayerId: string;
  monkeynautId: string;
};

type ChangePlayerOperatorMonkeynautResponse = Either<
  Error,
  {
    monkeynaut: IMonkeynaut;
  }
>;

@injectable()
class ChangePlayerOperatorMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,
  ) {}

  async execute({
    playerLoggedId,
    newOperatorPlayerId,
    monkeynautId,
  }: ChangePlayerOperatorMonkeynautRequestDTO): Promise<ChangePlayerOperatorMonkeynautResponse> {
    const foundActualOperatorPlayer = await this.playerRepository.findById(
      playerLoggedId,
    );

    if (!foundActualOperatorPlayer) {
      throw new AppError('Actual operator player does not exist', 404);
    }

    const foundNewOperatorPlayer = await this.playerRepository.findById(
      newOperatorPlayerId,
    );

    if (!foundNewOperatorPlayer) {
      throw new AppError('New player operator does not exist', 404);
    }

    const foundMonkeynaut = await this.monkeynautsRepository.findById(
      monkeynautId,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
    }

    if (playerLoggedId !== foundMonkeynaut.playerId) {
      throw new AppError(
        'Current operator reported is different from operator in monkeynaut',
        403,
      );
    }

    const { monkeynaut } = new Monkeynaut(
      {
        ...foundMonkeynaut,
        playerId: foundNewOperatorPlayer.id,
      },
      {
        id: foundMonkeynaut.id,
        createdAt: foundMonkeynaut.createdAt,
        updatedAt: new Date(),
      },
    );

    await this.monkeynautsRepository.save(monkeynaut);

    return right({
      monkeynaut,
    });
  }
}

export { ChangePlayerOperatorMonkeynautBusinessLogic };
