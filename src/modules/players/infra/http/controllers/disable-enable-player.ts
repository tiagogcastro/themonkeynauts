import {
  DisableEnablePlayerBusinessLogic,
  DisableEnablePlayerRequestDTO,
} from '@modules/players/core/business-logic/disable-enable-player';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { container } from 'tsyringe';

type DisableEnablePlayerControllerRequestDTO = DisableEnablePlayerRequestDTO & {
  player: {
    id: string;
  };
};
class DisableEnablePlayerController
  implements IController<DisableEnablePlayerControllerRequestDTO>
{
  async handle({
    playerId,
    player,
  }: DisableEnablePlayerControllerRequestDTO): Promise<HttpResponse> {
    try {
      const disableEnablePlayerBusinessLogic = container.resolve(
        DisableEnablePlayerBusinessLogic,
      );

      const result = await disableEnablePlayerBusinessLogic.execute(
        playerId || player.id,
      );

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return ok(instanceToInstance('player', result.value));
    } catch (error) {
      return fail(error as Error, 'DisableEnablePlayer');
    }
  }
}

const disableEnablePlayerController = new DisableEnablePlayerController();

export { disableEnablePlayerController };
