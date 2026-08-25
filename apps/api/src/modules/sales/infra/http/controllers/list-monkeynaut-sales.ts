import {
  ListMonkeynautSalesBusinesslogic,
  ListMonkeynautSalesRequestDTO,
} from '@modules/sales/core/business-logic/list-monkeynaut-sales';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class ListMonkeynautSalesController
  implements IController<ListMonkeynautSalesRequestDTO>
{
  async handle({
    sales,
  }: ListMonkeynautSalesRequestDTO): Promise<HttpResponse> {
    const listMonkeynautSalesBusinessLogic = container.resolve(
      ListMonkeynautSalesBusinesslogic,
    );

    const result = await listMonkeynautSalesBusinessLogic.execute({
      sales: sales ?? 'withoutException',
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listMonkeynautSalesController = new ListMonkeynautSalesController();

export { listMonkeynautSalesController };
