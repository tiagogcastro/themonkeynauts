import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createSaleEventController } from '../controllers/create-sale-event';
import { listSaleEventsController } from '../controllers/list-sale-events';

const saleEventsRouter = Router();

saleEventsRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      crypto: Joi.string().valid('BNB', 'BUSD', 'SPC'),
    },
  }),
  (request, response) => createSaleEventController.handle(request, response),
);

saleEventsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      playerId: Joi.string().uuid(),
    },
  }),
  (request, response) => listSaleEventsController.handle(request, response),
);

export { saleEventsRouter };
