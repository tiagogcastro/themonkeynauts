import { passwordRegExp, txHashRegExp } from '@/config/regexp';
import { adaptMiddleware } from '@/shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { balanceConfig } from '@/config/balance';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/shared/infra/http/validation';
import { createPlayerController } from '../controllers/create-player';
import { depositTokensController } from '../controllers/deposit-tokens';
import { disableEnablePlayerController } from '../controllers/disable-enable-player';
import { finishBountyHuntRunController } from '../controllers/finish-bounty-hunt-run';
import { initBountyHuntRunController } from '../controllers/init-bounty-hunt-run';
import { removePlayerResourceAmountController } from '../controllers/remove-player-resource-amount';
import { resetPasswordController } from '../controllers/reset-password';
import { saveWalletController } from '../controllers/save-wallet';
import { sendForgotPasswordEmailController } from '../controllers/send-forgot-password-email';
import { showPlayerController } from '../controllers/show-player';
import { updatePlayerController } from '../controllers/update-player';
import { withdrawTokensController } from '../controllers/withdraw-tokens';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ensureWalletMiddleware } from '../middlewares/ensure-wallet';

const playersRouter = Router();

playersRouter.post(
  '/create',
  validate({
    body: z.looseObject({
        email: z.email(),
        nickname: z.string().min(2).max(32),
        password: z.string().min(6).max(100),
      }),
  }),
  adaptRoute(createPlayerController),
);

playersRouter.put(
  '/update',
  ensureAuthenticated,
  validate({
    body: z.looseObject({
        nickname: z.string().min(2).max(32).optional(),
        oldPassword: z.string().optional(),
        newPassword: z.string().optional(),
        newPasswordConfirmation: z.string().optional(),
      }),
  }),
  adaptRoute(updatePlayerController),
);

playersRouter.get(
  '/show',
  validate({
    query: z.object({
      nickname: z.string().min(2).max(100).optional(),
      playerId: z.uuid().optional(),
    }),
  }),
  ensureAuthenticated,
  adaptRoute(showPlayerController),
);

playersRouter.patch(
  '/save-wallet',
  validate({
    body: z.object({
      wallet: z.string().min(1).toLowerCase(),
    }),
  }),
  ensureAuthenticated,
  adaptRoute(saveWalletController),
);

playersRouter.post(
  '/forgot-password',
  validate({
    body: z.object({
      email: z.email(),
    }),
  }),
  adaptRoute(sendForgotPasswordEmailController),
);

playersRouter.put(
  '/reset-password',
  validate({
    body: z.looseObject({
        token: z.uuid(),
        password: z.string().regex(passwordRegExp).min(8).max(100),
        passwordConfirmation: z.string(),
      })
      .refine(data => data.password === data.passwordConfirmation, {
        message: 'Password confirmation does not match',
        path: ['passwordConfirmation'],
      }),
  }),
  adaptRoute(resetPasswordController),
);

// resource
playersRouter.put(
  '/update-resource',
  validate({
    body: z.looseObject({
        nickname: z.string().optional(),
        playerId: z.string().optional(),
        resources: z.looseObject({
            spc: z.number().optional(),
            gold: z.number().optional(),
            iron: z.number().optional(),
            copper: z.number().optional(),
            scrap: z.number().optional(),
            science: z.number().optional(),
          })
          .optional(),
      }),
  }),
  ensureAuthenticated,
  adaptRoute(removePlayerResourceAmountController),
);

playersRouter.post(
  '/withdraw-tokens',
  validate({
    body: z.object({
      amount: z.number().min(balanceConfig.withdrawMinAmount).int().refine(v => v !== 0, { message: 'must not be zero' }),
    }),
  }),
  ensureAuthenticated,
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(withdrawTokensController),
);

playersRouter.post(
  '/deposit-tokens',
  validate({
    body: z.object({
      txHash: z.string().regex(txHashRegExp),
      amount: z.number().int().positive().optional(),
    }),
  }),
  ensureAuthenticated,
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(depositTokensController),
);

playersRouter.patch(
  '/disable-enable-player',
  ensureAuthenticated,
  adaptRoute(disableEnablePlayerController),
);

// Bounty hunt
playersRouter.post(
  '/init-bounty-hunt-run',
  ensureAuthenticated,
  adaptRoute(initBountyHuntRunController),
);

playersRouter.post(
  '/finish-bounty-hunt-run',
  validate({
    body: z.object({
      bossKill: z.boolean(),
      points: z.number().refine(v => v !== 0, { message: 'must not be zero' }),
    }),
  }),
  ensureAuthenticated,
  adaptRoute(finishBountyHuntRunController),
);

export { playersRouter };
