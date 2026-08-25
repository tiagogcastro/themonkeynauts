import { txHashRegExp } from '@/config/regexp';
import { ensureAuthenticated } from '@/modules/players/infra/http/middlewares/ensure-authenticated';
import { ensureWalletMiddleware } from '@/modules/players/infra/http/middlewares/ensure-wallet';
import { adaptMiddleware } from '@/shared/core/infra/adapters/express-middleware-adapter';
import { adaptRoute } from '@/shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '@/shared/infra/http/validation';
import { buySaleItemController } from '../controllers/buy-sale-item';
import { canBuySaleItemController } from '../controllers/can-buy-sale-item';
import { listMonkeynautSalesController } from '../controllers/list-monkeynaut-sales';
import { listPackSalesController } from '../controllers/list-pack-sales';
import { listShipSalesController } from '../controllers/list-ship-sales';

const salesFilter = z.enum(['actived', 'withoutException', 'notActived']).optional();

const buySaleItemSchema = z
  .object({
    packSaleId: z.uuid().optional(),
    monkeynautSaleId: z.uuid().optional(),
    shipSaleId: z.uuid().optional(),
    txHash: z.string().regex(txHashRegExp),
  })
  .refine(
    data =>
      Boolean(data.packSaleId || data.monkeynautSaleId || data.shipSaleId),
    {
      message: 'One of packSaleId, monkeynautSaleId or shipSaleId is required',
      path: ['packSaleId'],
    },
  );

const canBuySaleItemSchema = z
  .object({
    packSaleId: z.uuid().optional(),
    monkeynautSaleId: z.uuid().optional(),
    shipSaleId: z.uuid().optional(),
  })
  .refine(
    data =>
      Boolean(data.packSaleId || data.monkeynautSaleId || data.shipSaleId),
    {
      message: 'One of packSaleId, monkeynautSaleId or shipSaleId is required',
      path: ['packSaleId'],
    },
  );

const saleEventsRouter = Router();

saleEventsRouter.post(
  '/buy-sale-item',
  ensureAuthenticated,
  validate({ body: buySaleItemSchema }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(buySaleItemController),
);

saleEventsRouter.post(
  '/can-buy-sale-item',
  ensureAuthenticated,
  validate({ body: canBuySaleItemSchema }),
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(canBuySaleItemController),
);

saleEventsRouter.get(
  '/list-monkeynauts',
  ensureAuthenticated,
  validate({ query: z.object({ sales: salesFilter }) }),
  adaptRoute(listMonkeynautSalesController),
);

saleEventsRouter.get(
  '/list-packs',
  ensureAuthenticated,
  validate({ query: z.object({ sales: salesFilter }) }),
  adaptRoute(listPackSalesController),
);

saleEventsRouter.get(
  '/list-ships',
  ensureAuthenticated,
  validate({ query: z.object({ sales: salesFilter }) }),
  adaptRoute(listShipSalesController),
);

export { saleEventsRouter };
