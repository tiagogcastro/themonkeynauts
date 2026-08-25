import { FetchGameParamsBusinessLogic } from '@modules/game-params/core/business-logic/fetch-game-params';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class FetchGameParamsController implements IController {
  async handle(): Promise<HttpResponse> {
    const fetchGameParamsBusinessLogic = container.resolve(
      FetchGameParamsBusinessLogic,
    );

    const result = await fetchGameParamsBusinessLogic.execute();

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const fetchGameParamsController = new FetchGameParamsController();

export { fetchGameParamsController };
