import { ensureAuthenticated } from '@/modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/shared/infra/http/validation';
import { refuelShipController } from '../controllers/refuel-ship';

export const spaceStationRouter = Router();

spaceStationRouter.put(
  '/refuel-ship',
  ensureAuthenticated,
  validate({
    body: z.looseObject({
        shipId: z.uuid().optional(),
      }),
  }),
  adaptRoute(refuelShipController),
);
