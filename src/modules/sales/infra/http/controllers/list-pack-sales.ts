import { ListPackSalesBusinesslogic } from '@modules/sales/core/business-logic/list-pack-sales';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListPackSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPackSalesBusinessLogic = container.resolve(
      ListPackSalesBusinesslogic,
    );

    const packSales = await listPackSalesBusinessLogic.execute();

    return response.status(200).json(packSales);
  }
}

const listPackSalesController = new ListPackSalesController();

export { listPackSalesController };
