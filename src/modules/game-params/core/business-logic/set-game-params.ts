import { inject, injectable } from 'tsyringe';

import {
  GameParam,
  IGameParam,
} from '@modules/game-params/domain/entities/game-param';

import { Either, left, right } from '@shared/core/logic/either';
import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';
import { InvalidGameClientVersionError } from './errors/invalid-game-client-version-error';

export type SetGameParamsRequestDTO = {
  gameClientVersion?: string;
  travelFuelConsuption?: number;
  bountyHuntFuelConsuption?: number;
  shipRefuelCostInPercentage?: number;
  bountyHuntMinReward?: number;
  bountyHuntMaxReward?: number;
  mineGoldAverageResourceReward?: number;
  mineGoldAverageSpcReward?: number;
  mineGoldRewardsVariation?: number;
  mineIronAverageResourceReward?: number;
  mineIronAverageSpcReward?: number;
  mineIronRewardsVariation?: number;
  mineCopperAverageResourceReward?: number;
  mineCopperAverageSpcReward?: number;
  mineCooperRewardsVariation?: number;
  mineScrapAverageResourceReward?: number;
  mineScrapAverageSpcReward?: number;
  mineScrapRewardsVariation?: number;
};

type SetGameParamsResponse = Either<
  InvalidGameClientVersionError,
  {
    gameParams: IGameParam;
  }
>;

@injectable()
class SetGameParamsBusinessLogic {
  constructor(
    @inject('GameParamsRepository')
    private gameParamsRepository: IGameParamsRepository,
  ) {}

  async execute({
    bountyHuntFuelConsuption,
    bountyHuntMaxReward,
    bountyHuntMinReward,
    gameClientVersion,
    mineCooperRewardsVariation,
    mineCopperAverageResourceReward,
    mineCopperAverageSpcReward,
    mineGoldAverageResourceReward,
    mineGoldAverageSpcReward,
    mineGoldRewardsVariation,
    mineIronAverageResourceReward,
    mineIronAverageSpcReward,
    mineIronRewardsVariation,
    mineScrapAverageResourceReward,
    mineScrapAverageSpcReward,
    mineScrapRewardsVariation,
    shipRefuelCostInPercentage,
    travelFuelConsuption,
  }: SetGameParamsRequestDTO): Promise<SetGameParamsResponse> {
    let gameParams = await this.gameParamsRepository.findFirst();

    if (!gameParams) {
      if (!gameClientVersion) {
        return left(new InvalidGameClientVersionError());
      }

      const { gameParam } = new GameParam({
        gameClientVersion,
        bountyHuntFuelConsuption: bountyHuntFuelConsuption ?? 0,
        bountyHuntMaxReward: bountyHuntMaxReward ?? 0,
        bountyHuntMinReward: bountyHuntMinReward ?? 0,
        mineCooperRewardsVariation: mineCooperRewardsVariation ?? 0,
        mineCopperAverageResourceReward: mineCopperAverageResourceReward ?? 0,
        mineCopperAverageSpcReward: mineCopperAverageSpcReward ?? 0,
        mineGoldAverageResourceReward: mineGoldAverageResourceReward ?? 0,
        mineGoldAverageSpcReward: mineGoldAverageSpcReward ?? 0,
        mineGoldRewardsVariation: mineGoldRewardsVariation ?? 0,
        mineIronAverageResourceReward: mineIronAverageResourceReward ?? 0,
        mineIronAverageSpcReward: mineIronAverageSpcReward ?? 0,
        mineIronRewardsVariation: mineIronRewardsVariation ?? 0,
        mineScrapAverageResourceReward: mineScrapAverageResourceReward ?? 0,
        mineScrapAverageSpcReward: mineScrapAverageSpcReward ?? 0,
        mineScrapRewardsVariation: mineScrapRewardsVariation ?? 0,
        shipRefuelCostInPercentage: shipRefuelCostInPercentage ?? 0,
        travelFuelConsuption: travelFuelConsuption ?? 0,
      });

      gameParams = gameParam;

      return right({ gameParams });
    }

    const { gameParam } = new GameParam(
      {
        gameClientVersion: gameClientVersion || gameParams.gameClientVersion,
        bountyHuntFuelConsuption:
          bountyHuntFuelConsuption ?? gameParams.bountyHuntFuelConsuption,
        bountyHuntMaxReward:
          bountyHuntMaxReward ?? gameParams.bountyHuntMaxReward,
        bountyHuntMinReward:
          bountyHuntMinReward ?? gameParams.bountyHuntMinReward,
        mineCooperRewardsVariation:
          mineCooperRewardsVariation ?? gameParams.mineCooperRewardsVariation,
        mineCopperAverageResourceReward:
          mineCopperAverageResourceReward ??
          gameParams.mineCopperAverageResourceReward,
        mineCopperAverageSpcReward:
          mineCopperAverageSpcReward ?? gameParams.mineCopperAverageSpcReward,
        mineGoldAverageResourceReward:
          mineGoldAverageResourceReward ??
          gameParams.mineGoldAverageResourceReward,
        mineGoldAverageSpcReward:
          mineGoldAverageSpcReward ?? gameParams.mineGoldAverageSpcReward,
        mineGoldRewardsVariation:
          mineGoldRewardsVariation ?? gameParams.mineGoldRewardsVariation,
        mineIronAverageResourceReward:
          mineIronAverageResourceReward ??
          gameParams.mineIronAverageResourceReward,
        mineIronAverageSpcReward:
          mineIronAverageSpcReward ?? gameParams.mineIronAverageSpcReward,
        mineIronRewardsVariation:
          mineIronRewardsVariation ?? gameParams.mineIronRewardsVariation,
        mineScrapAverageResourceReward:
          mineScrapAverageResourceReward ??
          gameParams.mineScrapAverageResourceReward,
        mineScrapAverageSpcReward:
          mineScrapAverageSpcReward ?? gameParams.mineScrapAverageSpcReward,
        mineScrapRewardsVariation:
          mineScrapRewardsVariation ?? gameParams.mineScrapRewardsVariation,
        shipRefuelCostInPercentage:
          shipRefuelCostInPercentage ?? gameParams.shipRefuelCostInPercentage,
        travelFuelConsuption:
          travelFuelConsuption ?? gameParams.travelFuelConsuption,
      },
      {
        id: gameParams.id,
        createdAt: gameParams.createdAt,
      },
    );

    gameParams = gameParam;

    await this.gameParamsRepository.save(gameParams);

    return right({ gameParams });
  }
}

export { SetGameParamsBusinessLogic };
