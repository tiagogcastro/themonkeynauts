import {
  ListPackSalesBusinesslogic,
  ListPackSalesRequestDTO,
} from '@modules/sales/core/business-logic/list-pack-sales';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class ListPackSalesController implements IController<ListPackSalesRequestDTO> {
  async handle({ sales }: ListPackSalesRequestDTO): Promise<HttpResponse> {
    const listPackSalesBusinessLogic = container.resolve(
      ListPackSalesBusinesslogic,
    );

    const result = await listPackSalesBusinessLogic.execute({
      sales: sales ?? 'withoutException',
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listPackSalesController = new ListPackSalesController();

export { listPackSalesController };
