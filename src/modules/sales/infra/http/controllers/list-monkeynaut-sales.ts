import { ListMonkeynautSalesBusinesslogic } from '@modules/sales/core/business-logic/list-monkeynaut-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListMonkeynautSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listMonkeynautSalesBusinessLogic = container.resolve(
      ListMonkeynautSalesBusinesslogic,
    );

    const monkeynautSales = await listMonkeynautSalesBusinessLogic.execute();

    return response.status(200).json(monkeynautSales);
  }
}

const listMonkeynautSalesController = new ListMonkeynautSalesController();

export { listMonkeynautSalesController };
