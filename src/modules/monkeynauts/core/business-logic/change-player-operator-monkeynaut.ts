import { inject, injectable } from 'tsyringe';

import {
  IMonkeynaut,
  Monkeynaut,
} from '@modules/monkeynauts/domain/entities/monkeynaut';

import { ChangePlayerOperatorMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/change-player-operator-monkeynaut-request';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { AppError } from '@shared/errors/app-error';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class ChangePlayerOperatorMonkeynautBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,
  ) {}

  async execute({
    actual_operator_player_id,
    new_operator_player_id,
    monkeynaut_id,
  }: ChangePlayerOperatorMonkeynautRequestDTO): Promise<IMonkeynaut> {
    const foundActualOperatorPlayer = await this.playerRepository.findById(
      actual_operator_player_id,
    );

    if (!foundActualOperatorPlayer) {
      throw new AppError('Actual operator player does not exist', 404);
    }

    const foundNewOperatorPlayer = await this.playerRepository.findById(
      new_operator_player_id,
    );

    if (!foundNewOperatorPlayer) {
      throw new AppError('New player operator does not exist', 404);
    }

    const foundMonkeynaut = await this.monkeynautsRepository.findById(
      monkeynaut_id,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
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

    return monkeynaut;
  }
}

export { ChangePlayerOperatorMonkeynautBusinessLogic };
