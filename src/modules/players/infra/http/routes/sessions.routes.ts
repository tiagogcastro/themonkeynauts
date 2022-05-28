import { passwordRegExp } from '@config/regexp';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { signInPlayerController } from '../controllers/sign-in-player';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordRegExp).min(8).max(100).required(),
    },
  }),
  (request, response) => signInPlayerController.handle(request, response),
);

export { sessionsRouter };
