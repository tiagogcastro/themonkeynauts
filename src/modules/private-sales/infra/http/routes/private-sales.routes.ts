import { balanceConfig } from '@config/balance';
import { txHashRegExp } from '@config/regexp';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { ensureWalletMiddleware } from '@modules/players/infra/http/middlewares/ensure-wallet';
import { adaptMiddleware } from '@shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createPrivateSaleController } from '../controllers/create-private-sale';
import { showPlayerBNBBalanceController } from '../controllers/show-player-bnb-balance';

const privateSalesRouter = Router();

privateSalesRouter.post(
  '/create-private-sale',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        bnbAmount: Joi.number()
          .required()
          .min(balanceConfig.bnbAmountMin)
          .max(balanceConfig.bnbAmountMax),
        txHash: Joi.string().required().regex(txHashRegExp),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(createPrivateSaleController),
);

privateSalesRouter.get(
  '/show-player-bnb-balance',
  ensureAuthenticated,
  adaptRoute(showPlayerBNBBalanceController),
);

export { privateSalesRouter };
