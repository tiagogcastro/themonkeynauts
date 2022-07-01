import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateMonkeynautSaleBusinessLogic } from '@modules/sales/core/business-logic/update-monkeynaut-sale';
import { UpdateSaleRequestDTO } from '@modules/sales/dtos/update-sale-request';
import { UpdateSaleBusinessLogic } from '@modules/sales/core/business-logic/update-sale';
import { UpdateShipSaleBusinessLogic } from '@modules/sales/core/business-logic/update-ship-sale';
import { UpdatePackSaleBusinessLogic } from '@modules/sales/core/business-logic/update-pack-sale';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class UpdateSaleController implements IController<UpdateSaleRequestDTO> {
  async handle(data: UpdateSaleRequestDTO): Promise<HttpResponse> {
    const updateSaleBusinessLogic = container.resolve(UpdateSaleBusinessLogic);

    const Sale = {
      Monkeynaut: UpdateMonkeynautSaleBusinessLogic,
      Ship: UpdateShipSaleBusinessLogic,
      Pack: UpdatePackSaleBusinessLogic,
    }[data.type];

    const result = await updateSaleBusinessLogic.execute({
      ...data,
      sale: container.resolve(Sale as any),
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok(result.value);
  }
}

const updateSaleController = new UpdateSaleController();

export { updateSaleController };
