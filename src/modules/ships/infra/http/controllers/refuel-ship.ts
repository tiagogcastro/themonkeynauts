import { container } from 'tsyringe';

import {
  RefuelShipBusinessLogic,
  RefuelShipRequestDTO,
} from '@modules/ships/core/business-logic/refuel-ship';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

type RefuelShipControllerRequestDTO = RefuelShipRequestDTO & {
  player: {
    id: string;
  };
};

class RefuelShipController {
  async handle(data: RefuelShipControllerRequestDTO): Promise<HttpResponse> {
    const { player, playerId } = data;
    const playerLoggedId = player.id;

    const refuelShipBusinessLogic = container.resolve(RefuelShipBusinessLogic);

    const result = await refuelShipBusinessLogic.execute({
      ...data,
      playerId: playerId || playerLoggedId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const refuelShipController = new RefuelShipController();

export { refuelShipController };
