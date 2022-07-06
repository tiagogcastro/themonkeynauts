import { inject, injectable } from 'tsyringe';

import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { IInitBountyHuntTokenRepository } from '@modules/players/domain/repositories/init-bounty-hunt-token-repository';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';

import { Either, left, right } from '@shared/core/logic/either';

import { HandleBountyHuntRankBusinessLogic } from './handle-bounty-hunt-rank';

import { GameParamsNotFoundError } from './errors/game-params-not-found-error';
import { InvalidActiveShipError } from './errors/invalid-active-ship-error';
import { InvalidInitBountyHuntTokenError } from './errors/invalid-init-bounty-hunt-token-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { ResourceNotFoundError } from './errors/resource-not-fount-error';

type FinishBountyHuntRunResponse = Either<
  PlayerNotFoundError | ResourceNotFoundError,
  null
>;

export type FinishBountyHuntRunRequestDTO = {
  playerId: string;
  bossKill: boolean;
  points: number;
};

@injectable()
class FinishBountyHuntRunBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('HandleBountyHuntRankBusinessLogic')
    private handleBountyHuntRankBusinessLogic: HandleBountyHuntRankBusinessLogic,

    @inject('InitBountyHuntTokenRepository')
    private initBountyHuntTokenRepository: IInitBountyHuntTokenRepository,

    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute({
    playerId,
    points,
    bossKill,
  }: FinishBountyHuntRunRequestDTO): Promise<FinishBountyHuntRunResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const resource = await this.resourcesRepository.findByPlayerId(playerId);

    if (!resource) {
      return left(new ResourceNotFoundError());
    }

    if (!player.activeShipId) {
      return left(new InvalidActiveShipError());
    }

    const gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      return left(new GameParamsNotFoundError());
    }

    const { bountyHuntMaxReward, bountyHuntMinReward } = gameParams;

    const initBountyHuntToken =
      await this.initBountyHuntTokenRepository.findInitBountyHuntTokenByPlayerId(
        playerId,
      );

    if (!initBountyHuntToken || !initBountyHuntToken.token) {
      return left(new InvalidInitBountyHuntTokenError());
    }

    initBountyHuntToken.token = null;

    await this.initBountyHuntTokenRepository.update(initBountyHuntToken);

    const result = await this.handleBountyHuntRankBusinessLogic.execute({
      playerId,
      points,
    });

    if (result.isLeft()) {
      return left(result.value);
    }

    if (bossKill) {
      resource.spc += bountyHuntMaxReward;
    } else {
      resource.spc += bountyHuntMinReward;
    }

    await this.resourcesRepository.save(resource);

    return right(null);
  }
}

export { FinishBountyHuntRunBusinessLogic };
