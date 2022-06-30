import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { refuelShipController } from '../controllers/refuel-ship';

export const spaceStationRouter = Router();

spaceStationRouter.put(
  '/refuel-ship',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(refuelShipController),
);
