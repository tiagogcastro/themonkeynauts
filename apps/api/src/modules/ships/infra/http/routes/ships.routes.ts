import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';

import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@shared/infra/http/validation';

import { changeActivePlayerShipController } from '../controllers/change-active-player-ship';
import { consumeFuelController } from '../controllers/consume-fuel';
import { listShipsController } from '../controllers/list-ships';
import { listUniqueShipController } from '../controllers/list-unique-ship';

const shipsRouter = Router();

shipsRouter.get(
  '/list',
  ensureAuthenticated,
  validate({
    query: z.object({
      playerId: z.uuid().optional(),
    }),
  }),
  adaptRoute(listShipsController),
);

shipsRouter.get(
  '/list-unique',
  ensureAuthenticated,
  validate({
    query: z.object({
      playerId: z.uuid().optional(),
      shipId: z.uuid(),
    }),
  }),
  adaptRoute(listUniqueShipController),
);

shipsRouter.put(
  '/consume-fuel',
  ensureAuthenticated,
  validate({
    body: z.looseObject({
        shipId: z.uuid().optional(),
        action: z.enum(['Travel', 'BountyHunt']).optional(),
      }),
  }),
  adaptRoute(consumeFuelController),
);

shipsRouter.patch(
  '/change-active-ship',
  ensureAuthenticated,
  validate({
    body: z.object({
      shipId: z.uuid(),
    }),
  }),
  adaptRoute(changeActivePlayerShipController),
);

export { shipsRouter };
