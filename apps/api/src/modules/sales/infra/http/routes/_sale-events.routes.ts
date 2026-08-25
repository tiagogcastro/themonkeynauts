import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/shared/infra/http/validation';

import { createAirDropNftPlayerController } from '../controllers/create-air-drop-nft';
import { createSaleController } from '../controllers/create-sale';
import { updateSaleController } from '../controllers/update/update-sales';

const saleTypeSchema = z.enum(['Monkeynaut', 'Ship', 'Pack']);

const createSaleSchema = z
  .object({
    crypto: z.enum(['BNB', 'BUSD', 'SPC']).optional(),
    type: saleTypeSchema,
    price: z.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    quantity: z.number(),
    totalUnitsSold: z.number().optional(),

    saleMonkeynaut: z
      .object({
        private: z.number(),
        sergeant: z.number(),
        captain: z.number(),
        major: z.number(),
      })
      .optional(),
    saleShip: z
      .object({
        rankB: z.number(),
        rankA: z.number(),
        rankS: z.number(),
      })
      .optional(),
    salePack: z
      .object({
        type: z.enum(['Basic', 'Random', 'Advanced', 'Expert']),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'Monkeynaut' && !data.saleMonkeynaut) {
      ctx.addIssue({
        code: 'custom',
        message: 'saleMonkeynaut is required when type is Monkeynaut',
        path: ['saleMonkeynaut'],
      });
    }

    if (data.type === 'Ship' && !data.saleShip) {
      ctx.addIssue({
        code: 'custom',
        message: 'saleShip is required when type is Ship',
        path: ['saleShip'],
      });
    }

    if (data.type === 'Pack' && !data.salePack) {
      ctx.addIssue({
        code: 'custom',
        message: 'salePack is required when type is Pack',
        path: ['salePack'],
      });
    }
  });

const updateSaleSchema = z
  .object({
    crypto: z.enum(['BNB', 'BUSD', 'SPC']).optional(),
    price: z.number().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    quantity: z.number().optional(),
    totalUnitsSold: z.number().optional(),
    currentQuantityAvailable: z.number().optional(),
    active: z.boolean().optional(),

    type: saleTypeSchema,

    saleMonkeynaut: z
      .object({
        saleMonkeynautId: z.uuid(),
        private: z.number().optional(),
        sergeant: z.number().optional(),
        captain: z.number().optional(),
        major: z.number().optional(),
      })
      .optional(),
    saleShip: z
      .object({
        saleShipId: z.uuid(),
        rankB: z.number().optional(),
        rankA: z.number().optional(),
        rankS: z.number().optional(),
      })
      .optional(),
    salePack: z
      .object({
        salePackId: z.uuid(),
        type: z.enum(['Basic', 'Random', 'Advanced', 'Expert']).optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'Monkeynaut' && !data.saleMonkeynaut) {
      ctx.addIssue({
        code: 'custom',
        message: 'saleMonkeynaut is required when type is Monkeynaut',
        path: ['saleMonkeynaut'],
      });
    }

    if (data.type === 'Ship' && !data.saleShip) {
      ctx.addIssue({
        code: 'custom',
        message: 'saleShip is required when type is Ship',
        path: ['saleShip'],
      });
    }

    if (data.type === 'Pack' && !data.salePack) {
      ctx.addIssue({
        code: 'custom',
        message: 'salePack is required when type is Pack',
        path: ['salePack'],
      });
    }
  });

const createAirDropNftSchema = z.object({
  email: z.email(),
  type: saleTypeSchema,
  monkeynaut: z
    .object({
      rank: z.enum(['Private', 'Sergeant', 'Captain', 'Major', 'Random']),
      role: z.enum(['Random']),
    })
    .optional(),
  ship: z
    .object({
      rank: z.enum(['A', 'B', 'S', 'Random']),
      role: z.enum(['Random']),
    })
    .optional(),
});

const _saleEventsRouter = Router();

_saleEventsRouter.post(
  '/create',
  validate({ body: createSaleSchema }),
  adaptRoute(createSaleController),
);

_saleEventsRouter.put(
  '/update-sale',
  validate({ body: updateSaleSchema }),
  adaptRoute(updateSaleController),
);

_saleEventsRouter.post(
  '/create-air-drop-nft',
  validate({ body: createAirDropNftSchema }),
  adaptRoute(createAirDropNftPlayerController),
);

_saleEventsRouter.use('/sale-events', _saleEventsRouter);

export { _saleEventsRouter };
