import {
  CheckGameVersionBusinessLogic,
  CheckGameVersionRequestDTO,
} from '@modules/game-params/core/business-logic/check-game-version';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class CheckGameVersionController
  implements IController<CheckGameVersionRequestDTO>
{
  async handle({
    gameClientVersion,
  }: CheckGameVersionRequestDTO): Promise<HttpResponse> {
    const checkGameVersionBusinessLogic = container.resolve(
      CheckGameVersionBusinessLogic,
    );

    const result = await checkGameVersionBusinessLogic.execute({
      gameClientVersion,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const checkGameVersionController = new CheckGameVersionController();

export { checkGameVersionController };
