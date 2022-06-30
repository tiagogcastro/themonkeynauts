import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { changeActivePlayerShipController } from '../controllers/change-active-player-ship';
import { consumeFuelController } from '../controllers/consume-fuel';
import { listShipsController } from '../controllers/list-ships';
import { listUniqueShipController } from '../controllers/list-unique-ship';

const shipsRouter = Router();

shipsRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        playerId: Joi.string().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => listShipsController.handle(request, response),
);

shipsRouter.get(
  '/list-unique',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        playerId: Joi.string().uuid(),
        shipId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => listUniqueShipController.handle(request, response),
);

shipsRouter.put(
  '/consume-fuel',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid(),
        action: Joi.string().valid('Travel', 'BountyHunt'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(consumeFuelController),
);

shipsRouter.patch(
  '/change-active-ship',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      shipId: Joi.string().uuid().required(),
    },
  }),
  (request, response) =>
    changeActivePlayerShipController.handle(request, response),
);

export { shipsRouter };
