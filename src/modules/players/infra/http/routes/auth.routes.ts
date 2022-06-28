import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { appPlayerAuthController } from '../controllers/app-player-auth';

const authRouter = Router();

authRouter.post(
  '/app',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => appPlayerAuthController.handle(request, response),
);

export { authRouter };
