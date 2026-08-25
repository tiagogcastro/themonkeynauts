import { inject, injectable } from 'tsyringe';

import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { Either, left, right } from '@shared/core/logic/either';
import { GameParamsNotFoundError } from './errors/game-params-not-found-error';
import { InvalidGameVersionError } from './errors/invalid-game-version-error';

type CheckGameVersionResponse = Either<Error, null>;

export type CheckGameVersionRequestDTO = {
  gameClientVersion: string;
};

@injectable()
export class CheckGameVersionBusinessLogic {
  constructor(
    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute({
    gameClientVersion,
  }: CheckGameVersionRequestDTO): Promise<CheckGameVersionResponse> {
    const gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      return left(new GameParamsNotFoundError());
    }

    if (gameParams.gameClientVersion !== gameClientVersion) {
      return left(new InvalidGameVersionError());
    }

    return right(null);
  }
}
