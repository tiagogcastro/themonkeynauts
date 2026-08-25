import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@shared/infra/http/validation';

import { createShipController } from '../controllers/create-ship';
import { updateShipController } from '../controllers/update-ship';

const shipPropsSchema = {
  name: z.string().optional(),
  role: z.enum(['Fighter', 'Miner', 'Explorer']).optional(),
  rank: z.enum(['B', 'A', 'S']).optional(),
  bonusValue: z.number().optional(),
  bonusDescription: z.string().optional(),
  tankCapacity: z.number().optional(),
  crewCapacity: z.number().optional(),
  fuel: z.number().optional(),
  breedCount: z.number().optional(),
  canRefuelAtStation: z.boolean().optional(),
  onSale: z.boolean().optional(),
};

const _shipsRouter = Router();

_shipsRouter.post(
  '/create-ship',
  validate({
    body: z.looseObject({
        ownerId: z.uuid(),
        playerId: z.uuid().optional(),
        ...shipPropsSchema,
      }),
  }),
  adaptRoute(createShipController),
);

_shipsRouter.put(
  '/update-ship',
  validate({
    body: z.looseObject({
        shipId: z.uuid(),
        ownerId: z.uuid().optional(),
        playerId: z.uuid().optional(),
        ...shipPropsSchema,
      }),
  }),
  adaptRoute(updateShipController),
);

_shipsRouter.use('/ships', _shipsRouter);

export { _shipsRouter };
