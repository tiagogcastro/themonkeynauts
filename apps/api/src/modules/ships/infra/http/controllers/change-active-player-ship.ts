import { container } from 'tsyringe';

import {
  ChangeActivePlayerShipBusinessLogic,
  ChangeActivePlayerShipRequestDTO,
} from '@modules/ships/core/business-logic/change-active-player-ship';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';

type ChangeActivePlayerShipControllerRequestDTO =
  ChangeActivePlayerShipRequestDTO & {
    player: {
      id: string;
    };
  };

class ChangeActivePlayerShipController {
  async handle(
    data: ChangeActivePlayerShipControllerRequestDTO,
  ): Promise<HttpResponse> {
    const { playerId, shipId, player: loggedPlayer } = data;
    const playerLoggedId = loggedPlayer.id;

    const changeActivePlayerShipBusinessLogic = container.resolve(
      ChangeActivePlayerShipBusinessLogic,
    );

    const result = await changeActivePlayerShipBusinessLogic.execute({
      shipId,
      playerId: playerId || playerLoggedId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    const { player, shipActive } = result.value;

    return ok({
      player: instanceToInstance('player', player),
      shipActive,
    });
  }
}

const changeActivePlayerShipController = new ChangeActivePlayerShipController();

export { changeActivePlayerShipController };
