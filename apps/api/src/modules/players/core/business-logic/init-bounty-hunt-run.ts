import { InitBountyHuntToken } from '@modules/players/domain/entities/init-bounty-hunt-token';
import { IInitBountyHuntTokenRepository } from '@modules/players/domain/repositories/init-bounty-hunt-token-repository';
import crypto from 'node:crypto';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { Either, left, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { IPlayer } from '@modules/players/domain/entities/player';
import { IShip } from '@modules/ships/domain/entities/ship';
import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { InvalidActiveShipError } from './errors/invalid-active-ship-error';
import { InvalidShipFuelError } from './errors/invalid-ship-fuel-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { ResourceNotFoundError } from './errors/resource-not-fount-error';
import { ShipNotFoundError } from './errors/ship-not-fount-error';
import { GameParamsNotFoundError } from './errors/game-params-not-found-error';

type InitBountyHuntRunResponse = Either<
  PlayerNotFoundError | ResourceNotFoundError,
  {
    player: IPlayer;
    ship: IShip;
  }
>;

export type InitBountyHuntRunRequestDTO = {
  playerId: string;
};

@injectable()
class InitBountyHuntRunBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('InitBountyHuntTokenRepository')
    private initBountyHuntTokenRepository: IInitBountyHuntTokenRepository,

    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute({
    playerId,
  }: InitBountyHuntRunRequestDTO): Promise<InitBountyHuntRunResponse> {
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

    const ship = await this.shipsRepository.findById(
      player.activeShipId,
      false,
    );

    if (!ship) {
      return left(new ShipNotFoundError());
    }

    const gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      return left(new GameParamsNotFoundError());
    }

    const { bountyHuntFuelConsuption } = gameParams;

    if (ship.fuel < bountyHuntFuelConsuption) {
      return left(new InvalidShipFuelError());
    }

    ship.fuel -= bountyHuntFuelConsuption;

    const findedInitBountyHuntToken =
      await this.initBountyHuntTokenRepository.findInitBountyHuntTokenByPlayerId(
        playerId,
      );

    const token = crypto.randomBytes(48).toString('hex');

    if (findedInitBountyHuntToken) {
      findedInitBountyHuntToken.token = token;

      await this.initBountyHuntTokenRepository.save(findedInitBountyHuntToken);
    } else {
      const { initBountyHuntToken } = new InitBountyHuntToken({
        playerId,
        token,
      });

      await this.initBountyHuntTokenRepository.create(initBountyHuntToken);
    }

    await this.shipsRepository.save(ship);

    return right({
      player,
      ship,
    });
  }
}

export { InitBountyHuntRunBusinessLogic };
