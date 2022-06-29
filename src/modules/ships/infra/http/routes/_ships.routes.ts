import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createShipController } from '../controllers/create-ship';
import { updateShipController } from '../controllers/update-ship';

const _shipsRouter = Router();

_shipsRouter.post(
  '/create-ship',
  celebrate(
    {
      [Segments.BODY]: {
        ownerId: Joi.string().uuid().required(),
        playerId: Joi.string().uuid(),
        name: Joi.string(),
        role: Joi.string().valid('Fighter', 'Miner', 'Explorer'),
        rank: Joi.string().valid('B', 'A', 'S'),
        bonusValue: Joi.number(),
        bonusDescription: Joi.string(),
        tankCapacity: Joi.number(),
        crewCapacity: Joi.number(),
        fuel: Joi.number(),
        breedCount: Joi.number(),
        canRefuelAtStation: Joi.boolean(),
        onSale: Joi.boolean(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => createShipController.handle(request, response),
);

_shipsRouter.put(
  '/update-ship',
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid().required(),
        ownerId: Joi.string().uuid(),
        playerId: Joi.string().uuid(),
        name: Joi.string(),
        role: Joi.string().valid('Fighter', 'Miner', 'Explorer'),
        rank: Joi.string().valid('B', 'A', 'S'),
        bonusValue: Joi.number(),
        bonusDescription: Joi.string(),
        tankCapacity: Joi.number(),
        crewCapacity: Joi.number(),
        fuel: Joi.number(),
        breedCount: Joi.number(),
        canRefuelAtStation: Joi.boolean(),
        onSale: Joi.boolean(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => updateShipController.handle(request, response),
);

_shipsRouter.use('/ships', _shipsRouter);

export { _shipsRouter };
