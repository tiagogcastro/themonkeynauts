import { ListShipSalesBusinesslogic } from '@modules/sales/core/business-logic/list-ship-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListShipSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listShipSalesBusinessLogic = container.resolve(
      ListShipSalesBusinesslogic,
    );

    const shipSales = await listShipSalesBusinessLogic.execute();

    return response.status(200).json(shipSales);
  }
}

const listShipSalesController = new ListShipSalesController();

export { listShipSalesController };
