import { container } from 'tsyringe';

import {
  ListCrewsBusinessLogic,
  ListCrewsRequestDTO,
} from '@modules/crews/core/business-logic/list-crews';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class ListCrewsController implements IController<ListCrewsRequestDTO> {
  async handle(data: ListCrewsRequestDTO): Promise<HttpResponse> {
    const listCrewsBusinessLogic = container.resolve(ListCrewsBusinessLogic);

    const result = await listCrewsBusinessLogic.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listCrewsController = new ListCrewsController();

export { listCrewsController };
