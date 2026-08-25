import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import {
  FinishBountyHuntRunBusinessLogic,
  FinishBountyHuntRunRequestDTO,
} from '@modules/players/core/business-logic/finish-bounty-hunt-run';

type FinishBountyHuntRunControllerRequestDTO = {
  player: {
    id: string;
  };
} & FinishBountyHuntRunRequestDTO;

class FinishBountyHuntRunController
  implements IController<FinishBountyHuntRunControllerRequestDTO>
{
  async handle({
    player,
    points,
    playerId,
    bossKill,
  }: FinishBountyHuntRunControllerRequestDTO): Promise<HttpResponse> {
    try {
      const finishBountyHuntRunBusinessLogic = container.resolve(
        FinishBountyHuntRunBusinessLogic,
      );

      const result = await finishBountyHuntRunBusinessLogic.execute({
        playerId: playerId || player.id,
        bossKill,
        points,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      }

      return ok();
    } catch (error) {
      return fail(error as Error);
    }
  }
}

const finishBountyHuntRunController = new FinishBountyHuntRunController();

export { finishBountyHuntRunController };
