import { adaptMiddleware } from '@shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { banUnbanPlayerController } from '../controllers/ban-unban-player';
import { depositTokensController } from '../controllers/deposit-tokens';
import { disableEnablePlayerController } from '../controllers/disable-enable-player';
import { saveWalletController } from '../controllers/save-wallet';
import { withdrawTokensController } from '../controllers/withdraw-tokens';
import { ensureWalletMiddleware } from '../middlewares/ensure-wallet';

const _playersRouter = Router();

_playersRouter.patch(
  '/ban-unban-player',
  celebrate(
    {
      [Segments.BODY]: {
        playerIdOrWallet: Joi.string().required(),
        reason: Joi.string().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(banUnbanPlayerController),
);

_playersRouter.post(
  '/withdraw-tokens',
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().not(0).integer().required(),
      playerId: Joi.string().required().uuid(),
    },
  }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(withdrawTokensController),
);

_playersRouter.post(
  '/deposit-tokens',
  celebrate({
    [Segments.BODY]: {
      txHash: Joi.string().required().min(66).max(66),
      playerId: Joi.string().required().uuid(),
    },
  }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(depositTokensController),
);

_playersRouter.patch(
  '/save-wallet',
  celebrate(
    {
      [Segments.BODY]: {
        wallet: Joi.string().required(),
        playerId: Joi.string().required().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(saveWalletController),
);

_playersRouter.patch(
  '/disable-enable-player',
  adaptRoute(disableEnablePlayerController),
);

_playersRouter.use('/players', _playersRouter);

export { _playersRouter };
