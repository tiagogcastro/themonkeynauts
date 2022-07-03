import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { setGameParamsController } from '../controllers/set-game-params';

const _gameParamsRouter = Router();

_gameParamsRouter.post(
  '/set',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        gameClientVersion: Joi.string().required(),
        bountyHuntFuelConsuption: Joi.number().integer().required(),
        bountyHuntMaxReward: Joi.number().integer().required(),
        bountyHuntMinReward: Joi.number().integer().required(),
        mineCooperRewardsVariation: Joi.number().integer().required(),
        mineCopperAverageResourceReward: Joi.number().integer().required(),
        mineCopperAverageSpcReward: Joi.number().integer().required(),
        mineGoldAverageResourceReward: Joi.number().integer().required(),
        mineGoldAverageSpcReward: Joi.number().integer().required(),
        mineGoldRewardsVariation: Joi.number().integer().required(),
        mineIronAverageResourceReward: Joi.number().integer().required(),
        mineIronAverageSpcReward: Joi.number().integer().required(),
        mineIronRewardsVariation: Joi.number().integer().required(),
        mineScrapAverageResourceReward: Joi.number().integer().required(),
        mineScrapAverageSpcReward: Joi.number().integer().required(),
        mineScrapRewardsVariation: Joi.number().integer().required(),
        shipRefuelCostInPercentage: Joi.number().integer().required(),
        travelFuelConsuption: Joi.number().integer().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(setGameParamsController),
);

_gameParamsRouter.use('/game-params', _gameParamsRouter);

export { _gameParamsRouter };
