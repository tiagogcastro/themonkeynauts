import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { ensureOneHourWait } from '@modules/players/infra/http/middlewares/ensure-one-hour-wait';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { consumeFuelController } from '../controllers/consume-fuel';
import { createShipController } from '../controllers/create-ship';
import { listShipsController } from '../controllers/list-ships';
import { refuelShipController } from '../controllers/refuel-ship';
import { updateShipController } from '../controllers/update-ship';

const shipsRouter = Router();

shipsRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      playerId: Joi.string().uuid(),
    },
  }),
  (request, response) => listShipsController.handle(request, response),
);

shipsRouter.put(
  '/consume-fuel',
  ensureOneHourWait,
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      shipId: Joi.string().uuid(),
      action: Joi.string().valid('TRAVEL', 'BOUNTY_HUNT'),
    },
  }),
  (request, response) => consumeFuelController.handle(request, response),
);

shipsRouter.put(
  '/refuel-ship',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      shipId: Joi.string().uuid(),
    },
  }),
  (request, response) => refuelShipController.handle(request, response),
);

shipsRouter.post(
  '/create-ship',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      ownerId: Joi.string().uuid().required(),
      playerId: Joi.string().uuid(),
      name: Joi.string(),
      class: Joi.string().valid('FIGHTER', 'MINER', 'EXPLORER'),
      rank: Joi.string().valid('B', 'A', 'S'),
      bonusValue: Joi.number(),
      bonusDescription: Joi.string(),
      tankCapacity: Joi.number(),
      crewCapacity: Joi.number(),
      crew: Joi.number(),
      fuel: Joi.number(),
      avatar: Joi.string(),
      breedCount: Joi.number(),
      canRefuelAtStation: Joi.boolean(),
      onSale: Joi.boolean(),
    },
  }),
  (request, response) => createShipController.handle(request, response),
);

shipsRouter.put(
  '/update-ship',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      shipId: Joi.string().uuid().required(),
      ownerId: Joi.string().uuid(),
      playerId: Joi.string().uuid(),
      name: Joi.string(),
      class: Joi.string().valid('FIGHTER', 'MINER', 'EXPLORER'),
      rank: Joi.string().valid('B', 'A', 'S'),
      bonusValue: Joi.number(),
      bonusDescription: Joi.string(),
      tankCapacity: Joi.number(),
      crewCapacity: Joi.number(),
      crew: Joi.number(),
      fuel: Joi.number(),
      avatar: Joi.string(),
      breedCount: Joi.number(),
      canRefuelAtStation: Joi.boolean(),
      onSale: Joi.boolean(),
    },
  }),
  (request, response) => updateShipController.handle(request, response),
);

export { shipsRouter };
