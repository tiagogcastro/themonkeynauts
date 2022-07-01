import {
  SetGameParamsBusinessLogic,
  SetGameParamsRequestDTO,
} from '@modules/game-params/core/business-logic/set-game-params';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

type SetGameParamsControllerRequestDTO = SetGameParamsRequestDTO & {
  player: {
    id: string;
  };
};

class SetGameParamsController
  implements IController<SetGameParamsControllerRequestDTO>
{
  async handle(data: SetGameParamsControllerRequestDTO): Promise<HttpResponse> {
    const setGameParamsBusinessLogic = container.resolve(
      SetGameParamsBusinessLogic,
    );

    const result = await setGameParamsBusinessLogic.execute({
      ...data,
      playerId: data.player.id,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const setGameParamsController = new SetGameParamsController();

export { setGameParamsController };
