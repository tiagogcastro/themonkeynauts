import {
  ShowPlayerBusinessLogic,
  ShowPlayerRequestDTO,
} from '@modules/players/core/business-logic/show-player';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { container } from 'tsyringe';

type ShowPlayerControllerRequestDTO = ShowPlayerRequestDTO & {
  playerId?: string;
  player: {
    id: string;
  };
};

class ShowPlayerController
  implements IController<ShowPlayerControllerRequestDTO>
{
  async handle({
    player,
    playerId,
    nickname,
  }: ShowPlayerControllerRequestDTO): Promise<HttpResponse> {
    const showPlayerBusinessLogic = container.resolve(ShowPlayerBusinessLogic);

    const result = await showPlayerBusinessLogic.execute({
      nickname,
      playerId: playerId || player.id,
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

const showPlayerController = new ShowPlayerController();

export { showPlayerController };
