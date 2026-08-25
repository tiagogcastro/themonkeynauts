import { container } from 'tsyringe';

import {
  ListUniqueShipBusinessLogic,
  ListUniqueShipRequestDTO,
} from '@modules/ships/core/business-logic/list-unique-ship';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

type RequestQuery = {
  shipId: string;
  playerId: string;
};

type ListUniqueShipControllerRequestDTO = ListUniqueShipRequestDTO & {
  player: {
    id: string;
  };
};

class ListUniqueShipController {
  async handle(
    data: ListUniqueShipControllerRequestDTO,
  ): Promise<HttpResponse> {
    const { playerId, shipId, player } = data;
    const playerLoggedId = player.id;

    const listUniqueShipBusinessLogic = container.resolve(
      ListUniqueShipBusinessLogic,
    );

    const result = await listUniqueShipBusinessLogic.execute({
      playerId: playerId || playerLoggedId,
      shipId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listUniqueShipController = new ListUniqueShipController();

export { listUniqueShipController };
