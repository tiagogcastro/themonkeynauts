import { ensureAuthenticated } from '@/modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';

import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/shared/infra/http/validation';

import { createCrewController } from '../controllers/create-crew';

import { listCrewsController } from '../controllers/list-crews';
import { removeMonkeynautFromCrewController } from '../controllers/remove-monkeynaut-from-crew';

const crewsRouter = Router();

crewsRouter.get(
  '/list-by-monkeynaut',
  ensureAuthenticated,
  validate({
    query: z.object({
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(listCrewsController),
);

crewsRouter.get(
  '/list-by-ship',
  ensureAuthenticated,
  validate({
    query: z.object({
      shipId: z.uuid(),
    }),
  }),
  adaptRoute(listCrewsController),
);

crewsRouter.post(
  '/create',
  ensureAuthenticated,
  validate({
    body: z.object({
      shipId: z.uuid(),
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(createCrewController),
);

crewsRouter.delete(
  '/remove-monkeynaut',
  ensureAuthenticated,
  validate({
    query: z.object({
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(removeMonkeynautFromCrewController),
);

export { crewsRouter };
