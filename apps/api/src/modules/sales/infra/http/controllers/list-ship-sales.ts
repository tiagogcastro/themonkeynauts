import {
  ListShipSalesBusinesslogic,
  ListShipSalesRequestDTO,
  SaleAction,
} from '@modules/sales/core/business-logic/list-ship-sales';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListShipSalesController implements IController<ListShipSalesRequestDTO> {
  async handle({ sales }: ListShipSalesRequestDTO): Promise<HttpResponse> {
    const listShipSalesBusinessLogic = container.resolve(
      ListShipSalesBusinesslogic,
    );

    const result = await listShipSalesBusinessLogic.execute({
      sales: sales ?? 'withoutException',
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listShipSalesController = new ListShipSalesController();

export { listShipSalesController };
