import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';

import { createCrewController } from '../controllers/create-crew';

import { listCrewsController } from '../controllers/list-crews';

const crewsRouter = Router();

crewsRouter.get(
  '/list-unique',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      monkeynautId: Joi.string().uuid().required(),
    },
  }),
  (request, response) => listCrewsController.handle(request, response),
);

crewsRouter.post(
  '/create',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      playerId: Joi.string().uuid(),
      shipId: Joi.string().uuid().required(),
      monkeynautId: Joi.string().uuid().required(),
    },
  }),
  (request, response) => createCrewController.handle(request, response),
);

export { crewsRouter };
