import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import {
  BanUnbanPlayerBusinessLogic,
  BanUnbanPlayerRequestDTO,
} from '@modules/players/core/business-logic/ban-unban-player';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';

class BanUnbanPlayerController
  implements IController<BanUnbanPlayerRequestDTO>
{
  async handle({
    playerIdOrWallet,
    reason,
  }: BanUnbanPlayerRequestDTO): Promise<HttpResponse> {
    try {
      const banUnbanPlayerBusinessLogic = container.resolve(
        BanUnbanPlayerBusinessLogic,
      );

      const result = await banUnbanPlayerBusinessLogic.execute({
        playerIdOrWallet,
        reason,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      }

      return ok(instanceToInstance('player', result.value));
    } catch (error) {
      return fail(error as Error);
    }
  }
}

const banUnbanPlayerController = new BanUnbanPlayerController();

export { banUnbanPlayerController };
