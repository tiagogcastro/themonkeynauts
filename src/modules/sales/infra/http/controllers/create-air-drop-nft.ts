import { container } from 'tsyringe';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import {
  CreateAirDropNftBusinessLogic,
  CreateAirDropNftRequestDTO,
} from '@modules/sales/core/business-logic/create-air-drop-nft';

class CreateAirDropNftPlayerController
  implements IController<CreateAirDropNftRequestDTO>
{
  async handle({
    email,
    type,
    monkeynaut,
    ship,
  }: CreateAirDropNftRequestDTO): Promise<HttpResponse> {
    try {
      const createAirDropNftPlayerBusinessLogic = container.resolve(
        CreateAirDropNftBusinessLogic,
      );

      const result = await createAirDropNftPlayerBusinessLogic.execute({
        email,
        type,
        monkeynaut,
        ship,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      }

      return ok(result.value);
    } catch (error) {
      return fail(error as Error);
    }
  }
}

const createAirDropNftPlayerController = new CreateAirDropNftPlayerController();

export { createAirDropNftPlayerController };
