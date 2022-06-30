import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';

import { createCrewController } from '../controllers/create-crew';

import { listCrewsController } from '../controllers/list-crews';
import { removeMonkeynautFromCrewController } from '../controllers/remove-monkeynaut-from-crew';

const crewsRouter = Router();

crewsRouter.get(
  '/list-by-monkeynaut',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        monkeynautId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(listCrewsController),
);

crewsRouter.get(
  '/list-by-ship',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        shipId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(listCrewsController),
);

crewsRouter.post(
  '/create',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid().required(),
        monkeynautId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(createCrewController),
);

crewsRouter.delete(
  '/remove-monkeynaut',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        monkeynautId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(removeMonkeynautFromCrewController),
);

export { crewsRouter };
