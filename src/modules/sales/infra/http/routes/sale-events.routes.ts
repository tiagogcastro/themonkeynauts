import { txHashRegExp } from '@config/regexp';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { ensureWalletMiddleware } from '@modules/players/infra/http/middlewares/ensure-wallet';
import { adaptMiddleware } from '@shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { buySaleItemController } from '../controllers/buy-sale-item';
import { listMonkeynautSalesController } from '../controllers/list-monkeynaut-sales';
import { listPackSalesController } from '../controllers/list-pack-sales';
import { listShipSalesController } from '../controllers/list-ship-sales';

const saleEventsRouter = Router();

saleEventsRouter.post(
  '/buy-sale-item',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        packSaleId: Joi.string().uuid(),
        monkeynautSaleId: Joi.string().uuid(),
        shipSaleId: Joi.string().uuid(),
        txHash: Joi.string().required().regex(txHashRegExp),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(buySaleItemController),
);

saleEventsRouter.get(
  '/list-monkeynauts',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(listMonkeynautSalesController),
);

saleEventsRouter.get(
  '/list-packs',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(listPackSalesController),
);

saleEventsRouter.get(
  '/list-ships',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(listShipSalesController),
);

export { saleEventsRouter };
