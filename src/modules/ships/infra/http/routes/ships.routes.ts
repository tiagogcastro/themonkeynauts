import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { changeActivePlayerShipController } from '../controllers/change-active-player-ship';
import { consumeFuelController } from '../controllers/consume-fuel';
import { createShipController } from '../controllers/create-ship';
import { listShipsController } from '../controllers/list-ships';
import { listUniqueShipController } from '../controllers/list-unique-ship';
import { refuelShipController } from '../controllers/refuel-ship';
import { updateShipController } from '../controllers/update-ship';

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
        action: Joi.string().valid('TRAVEL', 'BOUNTY_HUNT'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => consumeFuelController.handle(request, response),
);

shipsRouter.put(
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

shipsRouter.post(
  '/create-ship',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate(
    {
      [Segments.BODY]: {
        ownerId: Joi.string().uuid().required(),
        playerId: Joi.string().uuid(),
        name: Joi.string(),
        role: Joi.string().valid('FIGHTER', 'MINER', 'EXPLORER'),
        rank: Joi.string().valid('B', 'A', 'S'),
        bonusValue: Joi.number(),
        bonusDescription: Joi.string(),
        tankCapacity: Joi.number(),
        crewCapacity: Joi.number(),
        fuel: Joi.number(),
        avatar: Joi.string(),
        breedCount: Joi.number(),
        canRefuelAtStation: Joi.boolean(),
        onSale: Joi.boolean(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => createShipController.handle(request, response),
);

shipsRouter.put(
  '/update-ship',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid().required(),
        ownerId: Joi.string().uuid(),
        playerId: Joi.string().uuid(),
        name: Joi.string(),
        role: Joi.string().valid('FIGHTER', 'MINER', 'EXPLORER'),
        rank: Joi.string().valid('B', 'A', 'S'),
        bonusValue: Joi.number(),
        bonusDescription: Joi.string(),
        tankCapacity: Joi.number(),
        crewCapacity: Joi.number(),
        fuel: Joi.number(),
        avatar: Joi.string(),
        breedCount: Joi.number(),
        canRefuelAtStation: Joi.boolean(),
        onSale: Joi.boolean(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => updateShipController.handle(request, response),
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
