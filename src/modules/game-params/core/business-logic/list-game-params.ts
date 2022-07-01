import { inject, injectable } from 'tsyringe';

import { IGameParam } from '@modules/game-params/domain/entities/game-param';

import { Either, left, right } from '@shared/core/logic/either';
import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { GameParamsNotFoundError } from './errors/game-params-not-found-error';

type ListGameParamsResponse = Either<
  GameParamsNotFoundError,
  {
    gameParams: IGameParam;
  }
>;

@injectable()
export class ListGameParamsBusinessLogic {
  constructor(
    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute(): Promise<ListGameParamsResponse> {
    const gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      return left(new GameParamsNotFoundError());
    }

    return right({ gameParams });
  }
}
