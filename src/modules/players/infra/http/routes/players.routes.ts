import { passwordRegExp } from '@config/regexp';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { banUnbanPlayerController } from '../controllers/ban-unban-player';
import { createPlayerController } from '../controllers/create-player';
import { disableEnablePlayerController } from '../controllers/disable-enable-player';
import { removePlayerResourceAmountController } from '../controllers/remove-player-resource-amount';
import { resetPasswordController } from '../controllers/reset-password';
import { saveWalletController } from '../controllers/save-wallet';
import { sendForgotPasswordEmailController } from '../controllers/send-forgot-password-email';
import { showPlayerController } from '../controllers/show-player';
import { updatePlayerController } from '../controllers/update-player';
import ensureAdministrator from '../middlewares/ensure-administrator';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

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
  (request, response) => createPlayerController.handle(request, response),
);

playersRouter.put('/update', ensureAuthenticated, (request, response) =>
  updatePlayerController.handle(request, response),
);

playersRouter.get(
  '/show',
  ensureAuthenticated,
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
  (request, response) => showPlayerController.handle(request, response),
);

playersRouter.patch(
  '/save-wallet',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        wallet: Joi.string().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => saveWalletController.handle(request, response),
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
  (request, response) =>
    sendForgotPasswordEmailController.handle(request, response),
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
  (request, response) => resetPasswordController.handle(request, response),
);

// resource
playersRouter.put(
  '/update-resource',
  ensureAuthenticated,
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
  (request, response) =>
    removePlayerResourceAmountController.handle(request, response),
);

playersRouter.patch(
  '/ban-unban-player',
  ensureAuthenticated,
  ensureAdministrator,
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

playersRouter.patch(
  '/disable-enable-player',
  ensureAuthenticated,
  adaptRoute(disableEnablePlayerController),
);

export { playersRouter };
