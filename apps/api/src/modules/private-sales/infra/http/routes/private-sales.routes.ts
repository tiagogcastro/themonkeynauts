import { balanceConfig } from '@config/balance';
import { txHashRegExp } from '@config/regexp';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { ensureWalletMiddleware } from '@modules/players/infra/http/middlewares/ensure-wallet';
import { adaptMiddleware } from '@shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@shared/infra/http/validation';

import { createPrivateSaleController } from '../controllers/create-private-sale';
import { showPlayerBNBBalanceController } from '../controllers/show-player-bnb-balance';

const privateSalesRouter = Router();

privateSalesRouter.post(
  '/create-private-sale',
  ensureAuthenticated,
  validate({
    body: z.object({
      bnbAmount: z
        .number()
        .min(balanceConfig.bnbAmountMin)
        .max(balanceConfig.bnbAmountMax),
      txHash: z.string().regex(txHashRegExp),
    }),
  }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(createPrivateSaleController),
);

privateSalesRouter.get(
  '/show-player-bnb-balance',
  ensureAuthenticated,
  adaptRoute(showPlayerBNBBalanceController),
);

export { privateSalesRouter };
