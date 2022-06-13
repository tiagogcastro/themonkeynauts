import { CreateMonkeynautSaleBusinessLogic } from '@modules/sales/core/business-logic/create-monkeynaut-sale';
import { CreatePackSaleBusinessLogic } from '@modules/sales/core/business-logic/create-pack-sale';
import { CreateSaleBusinessLogic } from '@modules/sales/core/business-logic/create-sale';
import { CreateShipSaleBusinessLogic } from '@modules/sales/core/business-logic/create-ship-sale';
import { CreateSaleRequestDTO } from '@modules/sales/dtos/create-sale-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateSaleRequestDTO;

    const createSaleBusinessLogic = container.resolve(CreateSaleBusinessLogic);

    const Sale = {
      MONKEYNAUT: CreateMonkeynautSaleBusinessLogic,
      SHIP: CreateShipSaleBusinessLogic,
      PACK: CreatePackSaleBusinessLogic,
    }[data.type];

    const createdSale = await createSaleBusinessLogic.execute({
      ...data,
      sale: container.resolve(Sale as any),
    });

    return response.status(201).json(createdSale);
  }
}

const createSaleController = new CreateSaleController();

export { createSaleController };
