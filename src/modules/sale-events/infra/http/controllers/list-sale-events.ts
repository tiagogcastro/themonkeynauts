import { ListSaleEventsBusinesslogic } from '@modules/sale-events/core/business-logic/list-sale-events';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListSaleEventsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSaleEventsBusinessSaleEventic = container.resolve(
      ListSaleEventsBusinesslogic,
    );

    const saleEvents = await listSaleEventsBusinessSaleEventic.execute();

    return response.status(200).json(saleEvents);
  }
}

const listSaleEventsController = new ListSaleEventsController();

export { listSaleEventsController };
