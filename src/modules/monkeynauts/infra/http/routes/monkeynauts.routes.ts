import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';

import { createMonkeynautController } from '../controllers/create-monkeynaut';

import { listMonkeynautsController } from '../controllers/list-monkeynauts';

import { updateMonkeynautController } from '../controllers/update-monkeynaut';

import { changePlayerOperatorMonkeynautController } from '../controllers/change-player-operator-monkeynaut';
import { changePlayerOwnerMonkeynautController } from '../controllers/change-player-owner-monkeynaut';

const monkeynautsRouter = Router();

monkeynautsRouter.get(
  '/list',
  ensureAuthenticated,
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
      ownerId: Joi.string().uuid().required(),
      playerId: Joi.string().uuid(),

      bonusDescription: Joi.string(),
      bonusValue: Joi.number(),

      baseAttributes: Joi.object({
        baseHealth: Joi.number().min(250).max(350),
        baseSpeed: Joi.number().min(20).max(50),
        basePower: Joi.number().min(20).max(50),
        baseResistence: Joi.number().min(20).max(50),
      }),

      breedCount: Joi.number(),

      class: Joi.string().regex(/^(SOLDIER|ENGINEER|SCIENTIST)$/),
      rank: Joi.string().regex(/^(PRIVATE|SERGEANT|CAPTAIN|MAJOR)$/),

      energy: Joi.number(),
      maxEnergy: Joi.number(),

      name: Joi.string(),
    },
  }),
  (request, response) => createMonkeynautController.handle(request, response),
);

monkeynautsRouter.put(
  '/update',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      ownerId: Joi.string().uuid().required(),
      playerId: Joi.string().uuid(),
      monkeynautId: Joi.string().uuid().required(),

      bonusDescription: Joi.string(),
      bonusValue: Joi.number(),

      baseAttributes: Joi.object({
        baseHealth: Joi.number().min(250).max(350),
        baseSpeed: Joi.number().min(20).max(50),
        basePower: Joi.number().min(20).max(50),
        baseResistence: Joi.number().min(20).max(50),
      }),

      attributes: Joi.object({
        health: Joi.number().min(250).max(350),
        speed: Joi.number().min(20).max(50),
        power: Joi.number().min(20).max(50),
        resistence: Joi.number().min(20).max(50),
      }),

      breedCount: Joi.number(),

      class: Joi.string().regex(/^(SOLDIER|ENGINEER|SCIENTIST)$/),
      rank: Joi.string().regex(/^(PRIVATE|SERGEANT|CAPTAIN|MAJOR)$/),

      energy: Joi.number(),
      maxEnergy: Joi.number(),

      name: Joi.string(),
    },
  }),
  (request, response) => updateMonkeynautController.handle(request, response),
);

monkeynautsRouter.put(
  '/change-player-operator',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      currentOperatorPlayerId: Joi.string().uuid().required(),
      newOperatorPlayerId: Joi.string().uuid().required(),
      monkeynautId: Joi.string().uuid().required(),
    },
  }),
  (request, response) =>
    changePlayerOperatorMonkeynautController.handle(request, response),
);

monkeynautsRouter.put(
  '/change-player-owner',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      currentOwnerPlayerId: Joi.string().uuid().required(),
      newOwnerPlayerId: Joi.string().uuid().required(),
      monkeynautId: Joi.string().uuid().required(),
    },
  }),
  (request, response) =>
    changePlayerOwnerMonkeynautController.handle(request, response),
);

monkeynautsRouter.put(
  '/update-name',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      ownerId: Joi.string().uuid().required(),
      monkeynautId: Joi.string().uuid().required(),

      name: Joi.string(),
    },
  }),
  (request, response) => updateMonkeynautController.handle(request, response),
);

export { monkeynautsRouter };
