import {
  ListMonkeynautSalesBusinesslogic,
  SaleAction,
} from '@modules/sales/core/business-logic/list-monkeynaut-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  sales: SaleAction;
};

class ListMonkeynautSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sales } = request.query as unknown as RequestQuery;

    const listMonkeynautSalesBusinessLogic = container.resolve(
      ListMonkeynautSalesBusinesslogic,
    );

    const monkeynautSales = await listMonkeynautSalesBusinessLogic.execute({
      sales: sales ?? 'withoutException',
    });

    return response.status(200).json(monkeynautSales);
  }
}

const listMonkeynautSalesController = new ListMonkeynautSalesController();

export { listMonkeynautSalesController };
