import { container } from 'tsyringe';

import {
  ConsumeFuelBusinessLogic,
  ConsumeFuelRequestDTO,
} from '@modules/ships/core/business-logic/consume-fuel';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

type ConsumeFuelControllerRequestDTO = ConsumeFuelRequestDTO & {
  player: {
    id: string;
  };
};

class ConsumeFuelController
  implements IController<ConsumeFuelControllerRequestDTO>
{
  async handle(data: ConsumeFuelControllerRequestDTO): Promise<HttpResponse> {
    const consumeFuelBusinessLogic = container.resolve(
      ConsumeFuelBusinessLogic,
    );

    const result = await consumeFuelBusinessLogic.execute({
      ...data,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const consumeFuelController = new ConsumeFuelController();

export { consumeFuelController };
