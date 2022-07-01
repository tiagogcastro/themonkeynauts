import { ListGameParamsBusinessLogic } from '@modules/game-params/core/business-logic/list-game-params';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class ListGameParamsController implements IController {
  async handle(): Promise<HttpResponse> {
    const listGameParamsBusinessLogic = container.resolve(
      ListGameParamsBusinessLogic,
    );

    const result = await listGameParamsBusinessLogic.execute();

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listGameParamsController = new ListGameParamsController();

export { listGameParamsController };
