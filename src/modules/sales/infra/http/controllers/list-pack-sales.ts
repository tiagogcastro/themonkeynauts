import {
  ListPackSalesBusinesslogic,
  SaleAction,
} from '@modules/sales/core/business-logic/list-pack-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  sales: SaleAction;
};

class ListPackSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sales } = request.query as unknown as RequestQuery;

    const listPackSalesBusinessLogic = container.resolve(
      ListPackSalesBusinesslogic,
    );

    const packSales = await listPackSalesBusinessLogic.execute({
      sales: sales ?? 'withoutException',
    });

    return response.status(200).json(packSales);
  }
}

const listPackSalesController = new ListPackSalesController();

export { listPackSalesController };
