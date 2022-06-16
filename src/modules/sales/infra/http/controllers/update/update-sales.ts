import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateMonkeynautSaleBusinessLogic } from '@modules/sales/core/business-logic/update-monkeynaut-sale';
import { UpdateSaleRequestDTO } from '@modules/sales/dtos/update-sale-request';
import { UpdateSaleBusinessLogic } from '@modules/sales/core/business-logic/update-sale';
import { UpdateShipSaleBusinessLogic } from '@modules/sales/core/business-logic/update-ship-sale';
import { UpdatePackSaleBusinessLogic } from '@modules/sales/core/business-logic/update-pack-sale';

class UpdateSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as UpdateSaleRequestDTO;

    const updateSaleBusinessLogic = container.resolve(UpdateSaleBusinessLogic);

    const Sale = {
      MONKEYNAUT: UpdateMonkeynautSaleBusinessLogic,
      SHIP: UpdateShipSaleBusinessLogic,
      PACK: UpdatePackSaleBusinessLogic,
    }[data.type];

    const updatedSale = await updateSaleBusinessLogic.execute({
      ...data,
      sale: container.resolve(Sale as any),
    });

    return response.status(201).json(updatedSale);
  }
}

const updateSaleController = new UpdateSaleController();

export { updateSaleController };
