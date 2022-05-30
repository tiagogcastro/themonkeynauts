import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createMonkeynautController } from '../controllers/create-monkeynaut';
import { listMonkeynautsController } from '../controllers/list-monkeynauts';

const monkeynautsRouter = Router();

monkeynautsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      player_id: Joi.string().uuid(),
    },
  }),
  (request, response) => listMonkeynautsController.handle(request, response),
);

monkeynautsRouter.post(
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
  (request, response) => createMonkeynautController.handle(request, response),
);

export { monkeynautsRouter };
