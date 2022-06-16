import {
  ListShipSalesBusinesslogic,
  SaleAction,
} from '@modules/sales/core/business-logic/list-ship-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  sales: SaleAction;
};

class ListShipSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sales } = request.query as unknown as RequestQuery;

    const listShipSalesBusinessLogic = container.resolve(
      ListShipSalesBusinesslogic,
    );

    const shipSales = await listShipSalesBusinessLogic.execute({
      sales: sales ?? 'withoutException',
    });

    return response.status(200).json(shipSales);
  }
}

const listShipSalesController = new ListShipSalesController();

export { listShipSalesController };
