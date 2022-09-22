import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { passwordRegExp, txHashRegExp } from '@config/regexp';

import { adaptMiddleware } from '@shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';

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
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        nickname: Joi.string().min(2).max(32).required(),
        password: Joi.string().min(6).max(100).required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(createPlayerController),
);

playersRouter.put(
  '/update',
  ensureAuthenticated,
  adaptRoute(updatePlayerController),
);

playersRouter.get(
  '/show',
  celebrate(
    {
      [Segments.QUERY]: {
        nickname: Joi.string().min(2).max(100),
        playerId: Joi.string().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  ensureAuthenticated,
  adaptRoute(showPlayerController),
);

playersRouter.patch(
  '/save-wallet',
  celebrate(
    {
      [Segments.BODY]: {
        wallet: Joi.string().required().lowercase(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  ensureAuthenticated,
  adaptRoute(saveWalletController),
);

playersRouter.post(
  '/forgot-password',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(sendForgotPasswordEmailController),
);

playersRouter.put(
  '/reset-password',
  celebrate(
    {
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().regex(passwordRegExp).min(8).max(100).required(),
        passwordConfirmation: Joi.string()
          .required()
          .valid(Joi.ref('password')),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(resetPasswordController),
);

// resource
playersRouter.put(
  '/update-resource',
  celebrate(
    {
      [Segments.BODY]: {
        nickname: Joi.string(),
        playerId: Joi.string(),
        resources: Joi.object({
          spc: Joi.number(),
          gold: Joi.number(),
          iron: Joi.number(),
          copper: Joi.number(),
          scrap: Joi.number(),
          science: Joi.number(),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  ensureAuthenticated,
  adaptRoute(removePlayerResourceAmountController),
);

playersRouter.post(
  '/withdraw-tokens',
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().not(0).integer().required(),
    },
  }),
  ensureAuthenticated,
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(withdrawTokensController),
);

playersRouter.post(
  '/deposit-tokens',
  celebrate({
    [Segments.BODY]: {
      txHash: Joi.string().required().regex(txHashRegExp),
    },
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
  celebrate({
    [Segments.BODY]: {
      bossKill: Joi.boolean().required(),
      points: Joi.number().not(0).required(),
    },
  }),
  ensureAuthenticated,
  adaptRoute(finishBountyHuntRunController),
);

export { playersRouter };
