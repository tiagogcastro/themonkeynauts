import { container } from 'tsyringe';

import {
  CreatePrivateSaleBusinessLogic,
  CreatePrivateSaleRequestDTO,
} from '@modules/private-sales/core/business-logic/create-private-sale';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  conflict,
  created,
  HttpResponse,
} from '@shared/core/infra/http-response';
import { InvalidTransactionToError } from '@shared/infra/providers/errors/invalid-transaction-to-error';
import { InvalidTransactionFromError } from '@shared/infra/providers/errors/invalid-transaction-from-error';
import { InvalidPrivateKeyError } from '@shared/infra/providers/errors/invalid-private-key-error';

class CreatePrivateSaleController implements IController {
  async handle(
    data: CreatePrivateSaleRequestDTO & {
      player: { id: string };
    },
  ): Promise<HttpResponse> {
    const playerId = data.player.id;

    const createPrivateSaleBusinessLogic = container.resolve(
      CreatePrivateSaleBusinessLogic,
    );

    const result = await createPrivateSaleBusinessLogic.execute({
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

    return created(result.value);
  }
}

const createPrivateSaleController = new CreatePrivateSaleController();

export { createPrivateSaleController };
