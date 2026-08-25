import { inject, injectable } from 'tsyringe';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';

import { AppError } from '@shared/errors/app-error';

import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { Either, right } from '@shared/core/logic/either';
import { ICrewsRepository } from '../../domain/repositories/crews-repositories';

export type RemoveMonkeynautFromCrewRequestDTO = {
  monkeynautId: string;
  playerId: string;
};

type RemoveMonkeynautFromCrewResponse = Either<Error, null>;

@injectable()
class RemoveMonkeynautFromCrewBusinessLogic {
  constructor(
    @inject('CrewsRepository')
    private crewsRepository: ICrewsRepository,

    @inject('MonkeynautsRepository')
    private monkeynautsRespository: IMonkeynautsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    monkeynautId,
    playerId,
  }: RemoveMonkeynautFromCrewRequestDTO): Promise<RemoveMonkeynautFromCrewResponse> {
    const foundPlayer = await this.playersRepository.findById(playerId);

    if (!foundPlayer) {
      throw new AppError('Player does not exist', 404);
    }

    const foundMonkeynaut = await this.monkeynautsRespository.findById(
      monkeynautId,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
    }

    const foundCrew = await this.crewsRepository.findUniqueByMonkeynautId(
      monkeynautId,
    );

    if (!foundCrew) {
      throw new AppError('Crew does not exist', 404);
    }

    await this.crewsRepository.destroy(foundCrew.id);

    const { log } = new Log({
      action: `Removed ${foundMonkeynaut.name} from crew: ${foundCrew.id}`,
      playerId,
      txHash: null,
    });

    await this.logsRepository.create(log);

    return right(null);
  }
}

export { RemoveMonkeynautFromCrewBusinessLogic };
