import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
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
  (request, response) => refuelShipController.handle(request, response),
);
