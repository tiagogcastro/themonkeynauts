import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createPrivateSaleController } from '../controllers/create-private-sale';

const salesRouter = Router();

salesRouter.post(
  '/create-private',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      player_id: Joi.string().uuid(),
      wallet: Joi.string(),
      bnbAmount: Joi.number(),
    },
  }),
  (request, response) => createPrivateSaleController.handle(request, response),
);

export { salesRouter };
