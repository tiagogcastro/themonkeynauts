import { ListShipSalesBusinesslogic } from '@modules/sales/core/business-logic/list-ship-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  listWithoutException: boolean;
};

class ListShipSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { listWithoutException } = request.query as unknown as RequestQuery;

    const listShipSalesBusinessLogic = container.resolve(
      ListShipSalesBusinesslogic,
    );

    const shipSales = await listShipSalesBusinessLogic.execute({
      listWithoutException: Boolean(listWithoutException),
    });

    return response.status(200).json(shipSales);
  }
}

const listShipSalesController = new ListShipSalesController();

export { listShipSalesController };
