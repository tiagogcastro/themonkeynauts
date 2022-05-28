import { passwordRegExp } from '@config/regexp';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createPlayerController } from '../controllers/create-player';
import { disablePlayerController } from '../controllers/disable-player';
import { resetPasswordController } from '../controllers/reset-password';
import { saveWalletController } from '../controllers/save-wallet';
import { sendForgotPasswordEmailController } from '../controllers/send-forgot-password-email';
import { showPlayerController } from '../controllers/show-player';
import { updatePlayerController } from '../controllers/update-player';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const playersRouter = Router();

playersRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      nickname: Joi.string().min(2).max(100).required(),
      password: Joi.string().regex(passwordRegExp).min(8).max(100).required(),
    },
  }),
  (request, response) => createPlayerController.handle(request, response),
);

playersRouter.put('/update', ensureAuthenticated, (request, response) =>
  updatePlayerController.handle(request, response),
);

playersRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      nickname: Joi.string().min(2).max(100),
    },
  }),
  (request, response) => showPlayerController.handle(request, response),
);

playersRouter.patch('/disable', ensureAuthenticated, (request, response) =>
  disablePlayerController.handle(request, response),
);

playersRouter.patch(
  '/save-wallet',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      wallet: Joi.string().required(),
    },
  }),
  (request, response) => saveWalletController.handle(request, response),
);

playersRouter.post(
  '/forgot-password',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  (request, response) =>
    sendForgotPasswordEmailController.handle(request, response),
);

playersRouter.put(
  '/reset-password',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().regex(passwordRegExp).min(8).max(100).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  (request, response) => resetPasswordController.handle(request, response),
);

export { playersRouter };
