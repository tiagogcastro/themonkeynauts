import { CreateMonkeynautSaleBusinessLogic } from '@modules/sales/core/business-logic/create-monkeynaut-sale';
import { CreatePackSaleBusinessLogic } from '@modules/sales/core/business-logic/create-pack-sale';
import { CreateSaleBusinessLogic } from '@modules/sales/core/business-logic/create-sale';
import { CreateShipSaleBusinessLogic } from '@modules/sales/core/business-logic/create-ship-sale';
import { CreateSaleRequestDTO } from '@modules/sales/dtos/create-sale-request';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  created,
  HttpResponse,
} from '@shared/core/infra/http-response';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type CreateSaleControllerRequestDTO = CreateSaleRequestDTO & {
  player: {
    id: string;
  };
};
class CreateSaleController
  implements IController<CreateSaleControllerRequestDTO>
{
  async handle({
    player,
    ...data
  }: CreateSaleControllerRequestDTO): Promise<HttpResponse> {
    const adminId = player.id;

    const createSaleBusinessLogic = container.resolve(CreateSaleBusinessLogic);

    const Sale = {
      Monkeynaut: CreateMonkeynautSaleBusinessLogic,
      Ship: CreateShipSaleBusinessLogic,
      Pack: CreatePackSaleBusinessLogic,
    }[data.type];

    const result = await createSaleBusinessLogic.execute({
      ...data,
      adminId,
      sale: container.resolve(Sale as typeof CreateShipSaleBusinessLogic),
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return created(result.value);
  }
}

const createSaleController = new CreateSaleController();

export { createSaleController };
