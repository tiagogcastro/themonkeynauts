import { CreateSaleEventBusinessLogic } from '@modules/sale-events/core/business-logic/create-sale-event';
import { CreateSaleEventRequestDTO } from '@modules/sale-events/dtos/create-sale-event-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateSaleEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateSaleEventRequestDTO;

    const createSaleEventBusinessLogic = container.resolve(
      CreateSaleEventBusinessLogic,
    );

    const SaleEvents = await createSaleEventBusinessLogic.execute(data);

    return response.status(201).json(SaleEvents);
  }
}

const createSaleEventController = new CreateSaleEventController();

export { createSaleEventController };
