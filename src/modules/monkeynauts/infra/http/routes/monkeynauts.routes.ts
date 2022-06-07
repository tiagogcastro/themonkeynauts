import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';

import { createMonkeynautController } from '../controllers/create-monkeynaut';
import { listMonkeynautsController } from '../controllers/list-monkeynauts';
import { changePlayerOperatorMonkeynautController } from '../controllers/change-player-operator-monkeynaut';

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
  celebrate({
    [Segments.BODY]: {
      player_id: Joi.string().uuid(),

      bonus_description: Joi.string(),
      bonus_value: Joi.number(),

      base_attributes: Joi.object({
        base_health: Joi.number().min(250).max(350),
        base_speed: Joi.number().min(20).max(50),
        base_power: Joi.number().min(20).max(50),
        base_resistence: Joi.number().min(20).max(50),
      }),

      breed_count: Joi.number(),

      class: Joi.string().regex(/^(SOLDIER|ENGINEER|SCIENTIST)$/),
      rank: Joi.string().regex(/^(PRIVATE|SERGEANT|CAPTAIN|MAJOR)$/),

      energy: Joi.number(),
      max_energy: Joi.number(),

      name: Joi.string(),
    },
  }),
  (request, response) => createMonkeynautController.handle(request, response),
);

monkeynautsRouter.put(
  '/change-player-operator',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      actual_operator_player_id: Joi.string().uuid(),
      new_operator_player_id: Joi.string().uuid(),
      monkeynaut_id: Joi.string().uuid().required(),
    },
  }),
  (request, response) =>
    changePlayerOperatorMonkeynautController.handle(request, response),
);

export { monkeynautsRouter };
