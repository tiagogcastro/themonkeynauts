import { container } from 'tsyringe';

import {
  UpdateShipBusinessLogic,
  UpdateShipRequestDTO,
} from '@modules/ships/core/business-logic/update-ship';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class UpdateShipController {
  async handle(data: UpdateShipRequestDTO): Promise<HttpResponse> {
    const updateShipBusinessLogic = container.resolve(UpdateShipBusinessLogic);

    const result = await updateShipBusinessLogic.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const updateShipController = new UpdateShipController();

export { updateShipController };
