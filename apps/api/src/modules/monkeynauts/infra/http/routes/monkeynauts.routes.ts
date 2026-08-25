import { Router } from 'express';
import { z } from 'zod';

import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';

import { validate } from '@shared/infra/http/validation';

import { listMonkeynautsController } from '../controllers/list-monkeynauts';
import { changePlayerOperatorMonkeynautController } from '../controllers/change-player-operator-monkeynaut';
import { changePlayerOwnerMonkeynautController } from '../controllers/change-player-owner-monkeynaut';

const monkeynautRoleSchema = z.enum(['Soldier', 'Engineer', 'Scientist']);
const monkeynautRankSchema = z.enum(['Private', 'Sergeant', 'Captain', 'Major']);

const baseAttributesSchema = z
  .object({
    baseHealth: z.number().min(250).max(350),
    baseSpeed: z.number().min(20).max(50),
    basePower: z.number().min(20).max(50),
    baseResistence: z.number().min(20).max(50),
  })
  .partial()
  .optional();

const attributesSchema = z
  .object({
    health: z.number().min(250).max(350),
    speed: z.number().min(20).max(50),
    power: z.number().min(20).max(50),
    resistence: z.number().min(20).max(50),
  })
  .partial()
  .optional();

const monkeynautsRouter = Router();

monkeynautsRouter.get(
  '/list',
  validate({
    query: z.object({
      playerId: z.uuid().optional(),
    }),
  }),
  ensureAuthenticated,
  adaptRoute(listMonkeynautsController),
);

monkeynautsRouter.put(
  '/change-player-operator',
  ensureAuthenticated,
  validate({
    body: z.object({
      newOperatorPlayerId: z.uuid(),
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(changePlayerOperatorMonkeynautController),
);

monkeynautsRouter.put(
  '/change-player-owner',
  ensureAuthenticated,
  validate({
    body: z.object({
      newOwnerPlayerId: z.uuid(),
      monkeynautId: z.uuid(),
    }),
  }),
  adaptRoute(changePlayerOwnerMonkeynautController),
);

export { monkeynautsRouter, baseAttributesSchema, attributesSchema, monkeynautRankSchema, monkeynautRoleSchema };
