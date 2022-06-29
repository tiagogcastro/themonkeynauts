import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';

import { listMonkeynautsController } from '../controllers/list-monkeynauts';

import { changePlayerOperatorMonkeynautController } from '../controllers/change-player-operator-monkeynaut';
import { changePlayerOwnerMonkeynautController } from '../controllers/change-player-owner-monkeynaut';

const monkeynautsRouter = Router();

monkeynautsRouter.get(
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
  (request, response) => listMonkeynautsController.handle(request, response),
);

monkeynautsRouter.put(
  '/change-player-operator',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
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

monkeynautsRouter.put(
  '/change-player-owner',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
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

export { monkeynautsRouter };
