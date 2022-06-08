import { balanceConfig } from '@config/balance';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createPrivateSaleController } from '../controllers/create-private-sale';
import { showPlayerBNBBalanceController } from '../controllers/show-player-bnb-balance';

const salesRouter = Router();

salesRouter.post(
  '/create-private-sale',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      player_id: Joi.string().uuid(),
      wallet: Joi.string().required(),
      bnb_amount: Joi.number()
        .required()
        .min(balanceConfig.bnb_amount_min)
        .max(balanceConfig.bnb_amount_max),
      tx_hash: Joi.string().required(),
    },
  }),
  (request, response) => createPrivateSaleController.handle(request, response),
);

salesRouter.get(
  '/show-player-bnb-balance',
  ensureAuthenticated,
  (request, response) =>
    showPlayerBNBBalanceController.handle(request, response),
);

export { salesRouter };
