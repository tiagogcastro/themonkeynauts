import { Router } from 'express';
import { createPlayerController } from '../useCases/createPlayer'
import { signInController } from '../useCases/signInPlayer';
import { showPlayerController } from '../useCases/showPlayer';
import { disablePlayerController } from '../useCases/disablePlayer';
import { updatePlayerController } from '../useCases/updatePlayer';
import { saveWalletController } from '../useCases/saveWallet';
import { celebrate, Joi, Segments } from 'celebrate'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { sendForgotPasswordEmailController } from '../useCases/sendForgotPasswordEmail';
import { resetPasswordController } from '../useCases/resetPassword';

const playersRouter = Router();

playersRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      nickname: Joi.string().min(2).max(100).required(),
      password: Joi.string().min(8).max(100).required(),
    }
  }),
  (request, response) => createPlayerController.handle(request, response),
);

playersRouter.put(
  '/update',
  ensureAuthenticated,
  (request, response) => updatePlayerController.handle(request, response),
);

playersRouter.get(
  '/show',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      nickname: Joi.string().min(2).max(100),
    }
  }),
  (request, response) => showPlayerController.handle(request, response),
);

playersRouter.patch(
  '/disable',
  ensureAuthenticated,
  (request, response) => disablePlayerController.handle(request, response),
);

playersRouter.patch(
  '/save-wallet',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      wallet: Joi.string().required(),
    }
  }),
  (request, response) => saveWalletController.handle(request, response),
);

playersRouter.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required(),
    }
  }),
  (request, response) => signInController.handle(request, response),
);

playersRouter.post('/forgot-password', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), (request, response) => sendForgotPasswordEmailController.handle(request, response))

playersRouter.put('/reset-password', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().min(8).max(100).required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password'))
  }
}), (request, response) => resetPasswordController.handle(request, response))

export { playersRouter };