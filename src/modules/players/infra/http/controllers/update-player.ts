import {
  UpdatePlayerBusinessLogic,
  UpdatePlayerRequestDTO,
} from '@modules/players/core/business-logic/update-player';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type UpdatePlayerControllerRequestDTO = UpdatePlayerRequestDTO & {
  player: {
    id: string;
  };
};
class UpdatePlayerController
  implements IController<UpdatePlayerControllerRequestDTO>
{
  async handle({
    nickname,
    newPassword,
    newPasswordConfirmation,
    oldPassword,
    role,
    player,
  }: UpdatePlayerControllerRequestDTO): Promise<HttpResponse> {
    const playerId = player.id;

    const updatePlayerBusinessLogic = container.resolve(
      UpdatePlayerBusinessLogic,
    );

    const result = await updatePlayerBusinessLogic.execute({
      playerId,
      nickname,
      newPassword,
      newPasswordConfirmation,
      oldPassword,
      role,
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok(instanceToInstance('player', result.value));
  }
}

const updatePlayerController = new UpdatePlayerController();

export { updatePlayerController };
