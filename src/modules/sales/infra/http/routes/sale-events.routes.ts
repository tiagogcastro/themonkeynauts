import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createSaleController } from '../controllers/create-sale';
import { listMonkeynautSalesController } from '../controllers/list-monkeynaut-sales';
import { listPackSalesController } from '../controllers/list-pack-sales';
import { listShipSalesController } from '../controllers/list-ship-sales';
import { updateSaleController } from '../controllers/update/update-sales';

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
  (request, response) => createSaleController.handle(request, response),
);

saleEventsRouter.get(
  '/list-monkeynauts',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
    },
  }),
  (request, response) =>
    listMonkeynautSalesController.handle(request, response),
);

saleEventsRouter.get(
  '/list-packs',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
    },
  }),
  (request, response) => listPackSalesController.handle(request, response),
);

saleEventsRouter.get(
  '/list-ships',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
    },
  }),
  (request, response) => listShipSalesController.handle(request, response),
);

// update
saleEventsRouter.put(
  '/update-sale',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      crypto: Joi.string().valid('BNB', 'BUSD', 'SPC'),
      price: Joi.number(),
      startDate: Joi.date(),
      endDate: Joi.date().optional(),
      quantity: Joi.number(),
      totalUnitsSold: Joi.number(),
      currentQuantityAvailable: Joi.number(),
      active: Joi.boolean(),

      type: Joi.string().valid('MONKEYNAUT', 'SHIP', 'PACK').required(),

      saleMonkeynaut: Joi.alternatives().conditional('type', {
        is: 'MONKEYNAUT',
        then: Joi.object({
          saleMonkeynautId: Joi.string().uuid().required(),
          private: Joi.number(),
          sargeant: Joi.number(),
          captain: Joi.number(),
          major: Joi.number(),
        }),
      }),
      saleShip: Joi.alternatives().conditional('type', {
        is: 'SHIP',
        then: Joi.object({
          saleShipId: Joi.string().uuid().required(),
          rank_b: Joi.number(),
          rank_a: Joi.number(),
          rank_s: Joi.number(),
        }),
      }),
      salePack: Joi.alternatives().conditional('type', {
        is: 'PACK',
        then: Joi.object({
          salePackId: Joi.string().uuid().required(),
          basic: Joi.number(),
          advanced: Joi.number(),
          expert: Joi.number(),
        }),
      }),
    },
  }),
  (request, response) => updateSaleController.handle(request, response),
);

export { saleEventsRouter };
