import { BuySaleItemBusinessLogic } from '@modules/sales/core/business-logic/buy-sale-item';
import { BuySaleItemRequestDTO } from '@modules/sales/dtos/buy-sale-item-request';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  conflict,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { InvalidPrivateKeyError } from '@shared/infra/providers/errors/invalid-private-key-error';
import { InvalidTransactionFromError } from '@shared/infra/providers/errors/invalid-transaction-from-error';
import { InvalidTransactionToError } from '@shared/infra/providers/errors/invalid-transaction-to-error';
import { container } from 'tsyringe';

type BuySaleItemControllerRequestDTO = BuySaleItemRequestDTO & {
  player: {
    id: string;
  };
};
class BuySaleItemController
  implements IController<BuySaleItemControllerRequestDTO>
{
  async handle(data: BuySaleItemControllerRequestDTO): Promise<HttpResponse> {
    const playerId = data.player.id;

    const buySaleItemBusinessLogic = container.resolve(
      BuySaleItemBusinessLogic,
    );

    const result = await buySaleItemBusinessLogic.execute({
      ...data,
      playerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidTransactionToError:
          return conflict(error);

        case InvalidTransactionFromError:
          return conflict(error);

        case InvalidPrivateKeyError:
          return conflict(error);

        default:
          return clientError(error);
      }
    }

    return ok();
  }
}

const buySaleItemController = new BuySaleItemController();

export { buySaleItemController };
