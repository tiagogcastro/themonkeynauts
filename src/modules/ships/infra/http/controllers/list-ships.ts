import { container } from 'tsyringe';

import {
  ListShipsBusinessLogic,
  ListShipsRequestDTO,
} from '@modules/ships/core/business-logic/list-ships';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class ListShipsController {
  async handle(data: ListShipsRequestDTO): Promise<HttpResponse> {
    const { playerId } = data;

    const listShipsBusinessLogic = container.resolve(ListShipsBusinessLogic);

    const result = await listShipsBusinessLogic.execute({
      playerId: playerId as string,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listShipsController = new ListShipsController();

export { listShipsController };
