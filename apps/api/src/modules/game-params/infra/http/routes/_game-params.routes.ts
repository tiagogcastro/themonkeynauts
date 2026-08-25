import { Router } from 'express';
import { z } from 'zod';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { validate } from '@/shared/infra/http/validation';
import { setGameParamsController } from '../controllers/set-game-params';

const _gameParamsRouter = Router();

const gameParamsSchema = z.looseObject({
  gameClientVersion: z.string(),
  bountyHuntFuelConsuption: z.number().int(),
  bountyHuntMaxReward: z.number().int(),
  bountyHuntMinReward: z.number().int(),
  mineCooperRewardsVariation: z.number().int(),
  mineCopperAverageResourceReward: z.number().int(),
  mineCopperAverageSpcReward: z.number().int(),
  mineGoldAverageResourceReward: z.number().int(),
  mineGoldAverageSpcReward: z.number().int(),
  mineGoldRewardsVariation: z.number().int(),
  mineIronAverageResourceReward: z.number().int(),
  mineIronAverageSpcReward: z.number().int(),
  mineIronRewardsVariation: z.number().int(),
  mineScrapAverageResourceReward: z.number().int(),
  mineScrapAverageSpcReward: z.number().int(),
  mineScrapRewardsVariation: z.number().int(),
  shipRefuelCostInPercentage: z.number().int(),
  travelFuelConsuption: z.number().int(),
});

_gameParamsRouter.post(
  '/set',
  validate({
    body: gameParamsSchema,
  }),
  adaptRoute(setGameParamsController),
);

_gameParamsRouter.use('/game-params', _gameParamsRouter);

export { _gameParamsRouter };
