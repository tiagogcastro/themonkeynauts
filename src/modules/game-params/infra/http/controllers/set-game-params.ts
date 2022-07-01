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

class SetGameParamsController implements IController<SetGameParamsRequestDTO> {
  async handle(data: SetGameParamsRequestDTO): Promise<HttpResponse> {
    const setGameParamsBusinessLogic = container.resolve(
      SetGameParamsBusinessLogic,
    );

    const result = await setGameParamsBusinessLogic.execute({
      ...data,
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
