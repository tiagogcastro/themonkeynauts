import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { setGameParamsController } from '../controllers/set-game-params';

const _gameParamsRouter = Router();

_gameParamsRouter.get(
  '/set-game-params',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        gameClientVersion: Joi.string(),
        bountyHuntFuelConsuption: Joi.number().integer(),
        bountyHuntMaxReward: Joi.number().integer(),
        bountyHuntMinReward: Joi.number().integer(),
        mineCooperRewardsVariation: Joi.number().integer(),
        mineCopperAverageResourceReward: Joi.number().integer(),
        mineCopperAverageSpcReward: Joi.number().integer(),
        mineGoldAverageResourceReward: Joi.number().integer(),
        mineGoldAverageSpcReward: Joi.number().integer(),
        mineGoldRewardsVariation: Joi.number().integer(),
        mineIronAverageResourceReward: Joi.number().integer(),
        mineIronAverageSpcReward: Joi.number().integer(),
        mineIronRewardsVariation: Joi.number().integer(),
        mineScrapAverageResourceReward: Joi.number().integer(),
        mineScrapAverageSpcReward: Joi.number().integer(),
        mineScrapRewardsVariation: Joi.number().integer(),
        shipRefuelCostInPercentage: Joi.number().integer(),
        travelFuelConsuption: Joi.number().integer(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(setGameParamsController),
);

_gameParamsRouter.use('/game-rarams', _gameParamsRouter);

export { _gameParamsRouter };
