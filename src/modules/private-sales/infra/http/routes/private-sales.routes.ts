import { balanceConfig } from '@config/balance';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createPrivateSaleController } from '../controllers/create-private-sale';
import { showPlayerBNBBalanceController } from '../controllers/show-player-bnb-balance';

const privateSalesRouter = Router();

privateSalesRouter.post(
  '/create-private-sale',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      playerId: Joi.string().uuid(),
      wallet: Joi.string().required(),
      bnbAmount: Joi.number()
        .required()
        .min(balanceConfig.bnbAmountMin)
        .max(balanceConfig.bnbAmountMax),
      txHash: Joi.string().required(),
    },
  }),
  (request, response) => createPrivateSaleController.handle(request, response),
);

privateSalesRouter.get(
  '/show-player-bnb-balance',
  ensureAuthenticated,
  (request, response) =>
    showPlayerBNBBalanceController.handle(request, response),
);

export { privateSalesRouter };
