import { txHashRegExp } from '@/config/regexp';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@/shared/infra/http/validation';

import { sendPrivateP2PController } from '../controllers/send-private-p2p';

const _privateP2PRouter = Router();

_privateP2PRouter.post(
  '/send',
  validate({
    body: z.object({
      email: z.email(),
      txHash: z.string().regex(txHashRegExp),
    }),
  }),
  adaptRoute(sendPrivateP2PController),
);

_privateP2PRouter.use('/private-p2p', _privateP2PRouter);

export { _privateP2PRouter };
