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
  InitBountyHuntRunBusinessLogic,
  InitBountyHuntRunRequestDTO,
} from '@modules/players/core/business-logic/init-bounty-hunt-run';

type InitBountyHuntRunControllerRequestDTO = InitBountyHuntRunRequestDTO & {
  player: {
    id: string;
  };
};

class InitBountyHuntRunController
  implements IController<InitBountyHuntRunControllerRequestDTO>
{
  async handle({
    player,
  }: InitBountyHuntRunControllerRequestDTO): Promise<HttpResponse> {
    try {
      const initBountyHuntRunBusinessLogic = container.resolve(
        InitBountyHuntRunBusinessLogic,
      );

      const result = await initBountyHuntRunBusinessLogic.execute({
        playerId: player.id,
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

const initBountyHuntRunController = new InitBountyHuntRunController();

export { initBountyHuntRunController };
