import { balanceConfig } from '@/config/balance';
import { txHashRegExp } from '@/config/regexp';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/shared/infra/http/validation';

import { createPrivateSaleController } from '../controllers/create-private-sale';

const _privateSalesRouter = Router();

_privateSalesRouter.post(
  '/create-private-sale',
  validate({
    body: z.object({
      wallet: z.string(),
      bnbAmount: z
        .number()
        .min(balanceConfig.bnbAmountMin)
        .max(balanceConfig.bnbAmountMax),
      txHash: z.string().regex(txHashRegExp),
    }),
  }),
  adaptRoute(createPrivateSaleController),
);

_privateSalesRouter.use('/private-sales', _privateSalesRouter);

export { _privateSalesRouter };
