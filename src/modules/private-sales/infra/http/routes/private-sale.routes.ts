import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createPrivateSaleController } from '../controllers/create-private-sale';

const salesRouter = Router();

salesRouter.post(
  '/create-private-sale',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      player_id: Joi.string().uuid().required(),
      wallet: Joi.string().required(),
      bnb_amount: Joi.number().required(),
      tx_hash: Joi.string().required(),
    },
  }),
  (request, response) => createPrivateSaleController.handle(request, response),
);

export { salesRouter };
