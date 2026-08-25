import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { checkGameVersionController } from '../controllers/check-game-version';

const systemsRouter = Router();

systemsRouter.post(
  '/version-check',
  celebrate(
    {
      [Segments.BODY]: {
        gameClientVersion: Joi.string().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(checkGameVersionController),
);

export { systemsRouter };
