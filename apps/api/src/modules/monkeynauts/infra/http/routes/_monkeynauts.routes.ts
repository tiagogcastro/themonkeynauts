import { Router } from 'express';
import { z } from 'zod';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { validate } from '@/shared/infra/http/validation';
import { createMonkeynautController } from '../controllers/create-monkeynaut';
import { updateMonkeynautController } from '../controllers/update-monkeynaut';
import { changePlayerOperatorMonkeynautController } from '../controllers/change-player-operator-monkeynaut';
import { changePlayerOwnerMonkeynautController } from '../controllers/change-player-owner-monkeynaut';
import {
  attributesSchema,
  baseAttributesSchema,
  monkeynautRankSchema,
  monkeynautRoleSchema,
} from './monkeynauts.routes';

const _monkeynautsRouter = Router();

_monkeynautsRouter.post(
  '/create-monkeynaut',
  validate({
    body: z.looseObject({
        ownerId: z.uuid(),
        playerId: z.uuid().optional(),

        bonusDescription: z.string().optional(),
        bonusValue: z.number().optional(),

        baseAttributes: baseAttributesSchema,

        breedCount: z.number().optional(),

        role: monkeynautRoleSchema.optional(),
        rank: monkeynautRankSchema.optional(),

        energy: z.number().optional(),
        maxEnergy: z.number().optional(),

        name: z.string().optional(),
      }),
  }),
  adaptRoute(createMonkeynautController),
);

_monkeynautsRouter.put(
  '/update-monkeynaut',
  validate({
    body: z.looseObject({
        ownerId: z.uuid(),
        playerId: z.uuid().optional(),
        monkeynautId: z.uuid(),

        bonusDescription: z.string().optional(),
        bonusValue: z.number().optional(),

        baseAttributes: baseAttributesSchema,
        attributes: attributesSchema,

        breedCount: z.number().optional(),

        role: monkeynautRoleSchema.optional(),
        rank: monkeynautRankSchema.optional(),

        energy: z.number().optional(),
        maxEnergy: z.number().optional(),

        name: z.string().optional(),
      }),
  }),
  adaptRoute(updateMonkeynautController),
);

_monkeynautsRouter.put(
  '/update-name',
  validate({
    body: z.object({
      ownerId: z.uuid(),
      monkeynautId: z.uuid(),

      name: z.string().optional(),
    }),
  }),
  adaptRoute(updateMonkeynautController),
);

_monkeynautsRouter.put(
  '/change-player-operator',
  validate({
    body: z.object({
      currentOperatorPlayerId: z.uuid(),
      newOperatorPlayerId: z.uuid(),
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(changePlayerOperatorMonkeynautController),
);

_monkeynautsRouter.put(
  '/change-player-owner',
  validate({
    body: z.object({
      currentOwnerPlayerId: z.uuid(),
      newOwnerPlayerId: z.uuid(),
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(changePlayerOwnerMonkeynautController),
);

_monkeynautsRouter.use('/monkeynauts', _monkeynautsRouter);

export { _monkeynautsRouter };
