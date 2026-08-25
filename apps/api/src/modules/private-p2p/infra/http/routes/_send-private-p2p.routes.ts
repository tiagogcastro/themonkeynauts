import { txHashRegExp } from '@config/regexp';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { sendPrivateP2PController } from '../controllers/send-private-p2p';

const _privateP2PRouter = Router();

_privateP2PRouter.post(
  '/send',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        txHash: Joi.string().required().regex(txHashRegExp),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(sendPrivateP2PController),
);

_privateP2PRouter.use('/private-p2p', _privateP2PRouter);

export { _privateP2PRouter };
