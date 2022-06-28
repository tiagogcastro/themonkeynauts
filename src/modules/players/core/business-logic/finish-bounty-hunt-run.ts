import { InitBountyHuntToken } from '@modules/players/domain/entities/init-bounty-hunt-token';
import { IInitBountyHuntTokenRepository } from '@modules/players/domain/repositories/init-bounty-hunt-token-repository';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { Either, left, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { InvalidActiveShipError } from './errors/invalid-active-ship-error';
import { InvalidInitBountyHuntTokenError } from './errors/invalid-init-bounty-hunt-token-error';
import { InvalidShipFuelError } from './errors/invalid-ship-fuel-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { ResourceNotFoundError } from './errors/resource-not-fount-error';
import { ShipNotFoundError } from './errors/ship-not-fount-error';
import { HandleBountyHuntRankBusinessLogic } from './handle-bounty-hunt-rank';

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

    const initBountyHuntToken =
      await this.initBountyHuntTokenRepository.findInitBountyHuntTokenByPlayerId(
        playerId,
      );

    if (!initBountyHuntToken || !initBountyHuntToken.token) {
      return left(new InvalidInitBountyHuntTokenError());
    }

    initBountyHuntToken.token = null;

    await this.initBountyHuntTokenRepository.update(initBountyHuntToken);

    await this.handleBountyHuntRankBusinessLogic.execute({
      playerId,
      points,
    });

    if (bossKill) {
      resource.spc += 15;
    } else {
      resource.spc += 10;
    }

    await this.resourcesRepository.save(resource);

    return right(null);
  }
}

export { FinishBountyHuntRunBusinessLogic };
