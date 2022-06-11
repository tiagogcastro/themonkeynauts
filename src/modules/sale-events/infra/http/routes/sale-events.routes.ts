import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { AppError } from '@shared/errors/app-error';
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
      type: Joi.string().valid('MONKEYNAUT', 'SHIP', 'PACK').required(),
      price: Joi.number().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().optional(),
      quantity: Joi.number().required(),
      totalUnitsSold: Joi.number(),

      saleMonkeynaut: Joi.alternatives().conditional('type', {
        is: 'MONKEYNAUT',
        then: Joi.object({
          private: Joi.number().required(),
          sargeant: Joi.number().required(),
          captain: Joi.number().required(),
          major: Joi.number().required(),
        }).required(),
      }),
      saleShip: Joi.alternatives().conditional('type', {
        is: 'SHIP',
        then: Joi.object({
          rank_b: Joi.number().required(),
          rank_a: Joi.number().required(),
          rank_s: Joi.number().required(),
        }).required(),
      }),
      salePack: Joi.alternatives().conditional('type', {
        is: 'PACK',
        then: Joi.object({
          basic: Joi.number().required(),
          advanced: Joi.number().required(),
          expert: Joi.number().required(),
        }).required(),
      }),
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
