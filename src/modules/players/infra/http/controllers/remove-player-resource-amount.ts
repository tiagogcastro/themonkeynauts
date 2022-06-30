import { Request, Response } from 'express';

import { instanceToInstance } from '@shared/helpers/instance-to-instance';

import { container } from 'tsyringe';
import {
  RemovePlayerResourceAmountBusinessLogic,
  RemovePlayerResourceAmountRequestDTO,
} from '@modules/players/core/business-logic/remove-player-resource-amount';
import { IResource } from '@modules/players/domain/entities/resource';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { IController } from '@shared/core/infra/controller';

type RemovePlayerResourceAmountControllerRequestDTO = {
  player: {
    id: string;
  };
} & RemovePlayerResourceAmountRequestDTO;
class RemovePlayerResourceAmountController
  implements IController<RemovePlayerResourceAmountControllerRequestDTO>
{
  async handle({
    player,
    playerId,
    resources,
    nickname,
  }: RemovePlayerResourceAmountControllerRequestDTO): Promise<HttpResponse> {
    const playerLoggedId = player.id;

    const removePlayerResourceAmountBusinessLogic = container.resolve(
      RemovePlayerResourceAmountBusinessLogic,
    );

    const result = await removePlayerResourceAmountBusinessLogic.execute({
      nickname,
      playerId: playerId || playerLoggedId,
      resources,
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok({
      player: instanceToInstance('player', result.value.player),
      resource: result.value.resource,
    });
  }
}

const removePlayerResourceAmountController =
  new RemovePlayerResourceAmountController();

export { removePlayerResourceAmountController };
