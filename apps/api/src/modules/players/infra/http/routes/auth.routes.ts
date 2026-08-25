import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@shared/infra/http/validation';

import { appPlayerAuthController } from '../controllers/app-player-auth';

const authRouter = Router();

authRouter.post(
  '/app',
  validate({
    body: z.object({
      email: z.email(),
      password: z.string(),
    }),
  }),
  adaptRoute(appPlayerAuthController),
);

export { authRouter };
