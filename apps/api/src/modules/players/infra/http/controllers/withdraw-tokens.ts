import { container } from 'tsyringe';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import {
  WithdrawTokensBusinessLogic,
  WithdrawTokensRequestDTO,
} from '@modules/players/core/business-logic/withdraw-tokens';
import { InvalidTransactionToError } from '@shared/infra/providers/errors/invalid-transaction-to-error';
import { InvalidTransactionFromError } from '@shared/infra/providers/errors/invalid-transaction-from-error';
import { InvalidPrivateKeyError } from '@shared/infra/providers/errors/invalid-private-key-error';

type WithdrawTokensControllerRequestDTO = WithdrawTokensRequestDTO & {
  player: {
    id: string;
  };
};

class WithdrawTokensController
  implements IController<WithdrawTokensControllerRequestDTO>
{
  async handle({
    amount,
    player,
    playerId,
  }: WithdrawTokensControllerRequestDTO): Promise<HttpResponse> {
    const withdrawTokensBusinessLogic = container.resolve(
      WithdrawTokensBusinessLogic,
    );

    const result = await withdrawTokensBusinessLogic.execute({
      amount,
      playerId: playerId || player.id,
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

    return ok(instanceToInstance('player', result.value));
  }
}

const withdrawTokensController = new WithdrawTokensController();

export { withdrawTokensController };
