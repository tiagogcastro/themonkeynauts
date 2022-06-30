import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createAirDropNftPlayerController } from '../controllers/create-air-drop-nft';
import { createSaleController } from '../controllers/create-sale';
import { updateSaleController } from '../controllers/update/update-sales';

const _saleEventsRouter = Router();

_saleEventsRouter.post(
  '/create',
  celebrate(
    {
      [Segments.BODY]: {
        crypto: Joi.string().valid('BNB', 'BUSD', 'SPC'),
        type: Joi.string().valid('Monkeynaut', 'Ship', 'Pack').required(),
        price: Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().optional(),
        quantity: Joi.number().required(),
        totalUnitsSold: Joi.number(),

        saleMonkeynaut: Joi.alternatives().conditional('type', {
          is: 'Monkeynaut',
          then: Joi.object({
            private: Joi.number().required(),
            sergeant: Joi.number().required(),
            captain: Joi.number().required(),
            major: Joi.number().required(),
          }).required(),
        }),
        saleShip: Joi.alternatives().conditional('type', {
          is: 'Ship',
          then: Joi.object({
            rankB: Joi.number().required(),
            rankA: Joi.number().required(),
            rankS: Joi.number().required(),
          }).required(),
        }),
        salePack: Joi.alternatives().conditional('type', {
          is: 'Pack',
          then: Joi.object({
            type: Joi.string()
              .valid('Basic', 'Random', 'Advanced', 'Expert')
              .required(),
          }).required(),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute( createSaleController)
);

_saleEventsRouter.put(
  '/update-sale',
  celebrate(
    {
      [Segments.BODY]: {
        crypto: Joi.string().valid('BNB', 'BUSD', 'SPC'),
        price: Joi.number(),
        startDate: Joi.date(),
        endDate: Joi.date().optional(),
        quantity: Joi.number(),
        totalUnitsSold: Joi.number(),
        currentQuantityAvailable: Joi.number(),
        active: Joi.boolean(),

        type: Joi.string().valid('Monkeynaut', 'Ship', 'Pack').required(),

        saleMonkeynaut: Joi.alternatives().conditional('type', {
          is: 'Monkeynaut',
          then: Joi.object({
            saleMonkeynautId: Joi.string().uuid().required(),
            private: Joi.number(),
            sergeant: Joi.number(),
            captain: Joi.number(),
            major: Joi.number(),
          }),
        }),
        saleShip: Joi.alternatives().conditional('type', {
          is: 'Ship',
          then: Joi.object({
            saleShipId: Joi.string().uuid().required(),
            rankB: Joi.number(),
            rankA: Joi.number(),
            rankS: Joi.number(),
          }),
        }),
        salePack: Joi.alternatives().conditional('type', {
          is: 'Pack',
          then: Joi.object({
            salePackId: Joi.string().uuid().required(),
            type: Joi.string().valid('Basic', 'Random', 'Advanced', 'Expert'),
          }),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute( updateSaleController)
);

_saleEventsRouter.post(
  '/create-air-drop-nft',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        type: Joi.string().valid('Monkeynaut', 'Ship', 'Pack').required(),
        monkeynaut: Joi.alternatives().conditional('type', {
          is: 'Monkeynaut',
          then: Joi.object({
            rank: Joi.string().valid(
              'Private',
              'Sergeant',
              'Captain',
              'Major',
              'Random',
            ),
            role: Joi.string().valid('Random'),
          }),
        }),
        ship: Joi.alternatives().conditional('type', {
          is: 'Ship',
          then: Joi.object({
            rank: Joi.string().valid('A', 'B', 'S', 'Random'),
            role: Joi.string().valid('Random'),
          }),
        }),
        pack: Joi.alternatives().conditional('type', {
          is: 'Pack',
          then: Joi.optional(),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(createAirDropNftPlayerController),
);

_saleEventsRouter.use('/sale-events', _saleEventsRouter);

export { _saleEventsRouter };
