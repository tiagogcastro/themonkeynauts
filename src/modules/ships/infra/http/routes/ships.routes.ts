import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createShipController } from '../controllers/create-ship';
import { listShipsController } from '../controllers/list-ships';

const shipsRouter = Router();

shipsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      player_id: Joi.string().uuid(),
    },
  }),
  (request, response) => listShipsController.handle(request, response),
);

shipsRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      player_id: Joi.string().uuid().required(),
      bonus: Joi.string().required(),
      bonus_value: Joi.number().required(),
      breed_count: Joi.number().required(),
      class: Joi.string()
        .regex(/^(SOLDIER|ENGINEER|SCIENTIST)$/)
        .required(),
      rank: Joi.string()
        .regex(/^(PRIVATE|SERGEANT|CAPTAIN|MAJOR)$/)
        .required(),
      energy: Joi.number().required(),
      health: Joi.number().required(),
      max_energy: Joi.number().required(),

      name: Joi.string(),

      power: Joi.number(),
      resistence: Joi.number(),
      speed: Joi.number(),
    },
  }),
  (request, response) => createShipController.handle(request, response),
);

export { shipsRouter };
