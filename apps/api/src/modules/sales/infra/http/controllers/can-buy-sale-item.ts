import {
  CanBuySaleItemBusinessLogic,
  CanBuySaleItemRequestDTO,
} from '@modules/sales/core/business-logic/can-buy-sale-item';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

type CanBuySaleItemControllerRequestDTO = CanBuySaleItemRequestDTO & {
  player: {
    id: string;
  };
};

class CanBuySaleItemController
  implements IController<CanBuySaleItemControllerRequestDTO>
{
  async handle(
    data: CanBuySaleItemControllerRequestDTO,
  ): Promise<HttpResponse> {
    const playerId = data.player.id;

    const canBuySaleItemBusinessLogic = container.resolve(
      CanBuySaleItemBusinessLogic,
    );

    const result = await canBuySaleItemBusinessLogic.execute({
      ...data,
      playerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        default:
          return clientError(error);
      }
    }

    return ok(result.value);
  }
}

const canBuySaleItemController = new CanBuySaleItemController();

export { canBuySaleItemController };
