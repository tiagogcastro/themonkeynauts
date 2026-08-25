import { txHashRegExp } from '@/config/regexp';
import { balanceConfig } from '@/config/balance';
import { adaptMiddleware } from '@/shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/shared/infra/http/validation';

import { banUnbanPlayerController } from '../controllers/ban-unban-player';
import { depositTokensController } from '../controllers/deposit-tokens';
import { disableEnablePlayerController } from '../controllers/disable-enable-player';
import { saveWalletController } from '../controllers/save-wallet';
import { withdrawTokensController } from '../controllers/withdraw-tokens';
import { ensureWalletMiddleware } from '../middlewares/ensure-wallet';

const _playersRouter = Router();

_playersRouter.patch(
  '/ban-unban-player',
  validate({
    body: z.object({
      playerIdOrWallet: z.string(),
      reason: z.string(),
    }),
  }),
  adaptRoute(banUnbanPlayerController),
);

_playersRouter.post(
  '/withdraw-tokens',
  validate({
    body: z.object({
      amount: z.number().min(balanceConfig.withdrawMinAmount).int().refine(v => v !== 0, { message: 'must not be zero' }),
      playerId: z.uuid(),
    }),
  }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(withdrawTokensController),
);

_playersRouter.post(
  '/deposit-tokens',
  validate({
    body: z.object({
      txHash: z.string().regex(txHashRegExp),
      amount: z.number().int().positive().optional(),
      playerId: z.uuid(),
    }),
  }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(depositTokensController),
);

_playersRouter.patch(
  '/save-wallet',
  validate({
    body: z.object({
      wallet: z.string().toLowerCase(),
      playerId: z.uuid(),
    }),
  }),
  adaptRoute(saveWalletController),
);

_playersRouter.patch(
  '/disable-enable-player',
  validate({
    body: z.object({
      playerId: z.uuid(),
    }),
  }),
  adaptRoute(disableEnablePlayerController),
);

_playersRouter.use('/players', _playersRouter);

export { _playersRouter };
