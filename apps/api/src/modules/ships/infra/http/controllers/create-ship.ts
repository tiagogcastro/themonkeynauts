import { container } from 'tsyringe';
import {
  CreateShipBusinessLogic,
  CreateShipRequestDTO,
} from '@modules/ships/core/business-logic/create-ship';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class CreateShipController {
  async handle(data: CreateShipRequestDTO): Promise<HttpResponse> {
    const createShipBusinessLogic = container.resolve(CreateShipBusinessLogic);

    const result = await createShipBusinessLogic.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const createShipController = new CreateShipController();

export { createShipController };
