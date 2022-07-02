import { inject, injectable } from 'tsyringe';

import { IGameParam } from '@modules/game-params/domain/entities/game-param';

import { Either, right } from '@shared/core/logic/either';
import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { Maybe } from '@shared/core/logic/maybe';

type FetchGameParamsResponse = Either<
  Error,
  {
    gameParams: IGameParam | Maybe<null>;
  }
>;

@injectable()
export class FetchGameParamsBusinessLogic {
  constructor(
    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute(): Promise<FetchGameParamsResponse> {
    const gameParams = await this.gameParamsRepository.findFirst();

    return right({ gameParams });
  }
}
