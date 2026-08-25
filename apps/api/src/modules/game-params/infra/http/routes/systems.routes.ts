import { Router } from 'express';

import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';

import { validate } from '@shared/infra/http/validation';
import { z } from 'zod';

import { checkGameVersionController } from '../controllers/check-game-version';

const systemsRouter = Router();

systemsRouter.post(
  '/version-check',
  validate({
    body: z.object({
      gameClientVersion: z.string(),
    }),
  }),
  adaptRoute(checkGameVersionController),
);

export { systemsRouter };
