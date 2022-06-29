import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { createMonkeynautController } from '../controllers/create-monkeynaut';

import { updateMonkeynautController } from '../controllers/update-monkeynaut';

import { changePlayerOperatorMonkeynautController } from '../controllers/change-player-operator-monkeynaut';
import { changePlayerOwnerMonkeynautController } from '../controllers/change-player-owner-monkeynaut';

const _monkeynautsRouter = Router();

_monkeynautsRouter.post(
  '/create-monkeynaut',
  celebrate(
    {
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

        role: Joi.string().regex(/^(Soldier|Engineer|Scientist)$/),
        rank: Joi.string().regex(/^(Private|Sergeant|Captain|Major)$/),

        energy: Joi.number(),
        maxEnergy: Joi.number(),

        name: Joi.string(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(createMonkeynautController),
);

_monkeynautsRouter.put(
  '/update-monkeynaut',
  celebrate(
    {
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

        role: Joi.string().regex(/^(Soldier|Engineer|Scientist)$/),
        rank: Joi.string().regex(/^(Private|Sergeant|Captain|Major)$/),

        energy: Joi.number(),
        maxEnergy: Joi.number(),

        name: Joi.string(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => updateMonkeynautController.handle(request, response),
);

_monkeynautsRouter.put(
  '/update-name',
  celebrate(
    {
      [Segments.BODY]: {
        ownerId: Joi.string().uuid().required(),
        monkeynautId: Joi.string().uuid().required(),

        name: Joi.string(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => updateMonkeynautController.handle(request, response),
);

_monkeynautsRouter.put(
  '/change-player-operator',
  celebrate(
    {
      [Segments.BODY]: {
        currentOperatorPlayerId: Joi.string().uuid().required(),
        newOperatorPlayerId: Joi.string().uuid().required(),
        monkeynautId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) =>
    changePlayerOperatorMonkeynautController.handle(request, response),
);

_monkeynautsRouter.put(
  '/change-player-owner',
  celebrate(
    {
      [Segments.BODY]: {
        currentOwnerPlayerId: Joi.string().uuid().required(),
        newOwnerPlayerId: Joi.string().uuid().required(),
        monkeynautId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) =>
    changePlayerOwnerMonkeynautController.handle(request, response),
);

_monkeynautsRouter.use('/monkeynauts', _monkeynautsRouter);

export { _monkeynautsRouter };
