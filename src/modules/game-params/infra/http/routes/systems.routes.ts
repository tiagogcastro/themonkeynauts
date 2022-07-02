import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { checkGameVersionController } from '../controllers/check-game-version';

const systemsRouter = Router();

systemsRouter.post(
  '/version-check',
  ensureAuthenticated,
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
