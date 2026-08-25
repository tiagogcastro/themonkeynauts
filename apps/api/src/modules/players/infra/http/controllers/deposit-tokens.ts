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
  DepositTokensBusinessLogic,
  DepositTokensRequestDTO,
} from '@modules/players/core/business-logic/deposit-tokens';
import { InvalidTransactionToError } from '@shared/infra/providers/errors/invalid-transaction-to-error';
import { InvalidTransactionFromError } from '@shared/infra/providers/errors/invalid-transaction-from-error';
import { InvalidPrivateKeyError } from '@shared/infra/providers/errors/invalid-private-key-error';

type DepositTokensControllerRequestDTO = DepositTokensRequestDTO & {
  player: {
    id: string;
  };
};

class DepositTokensController
  implements IController<DepositTokensControllerRequestDTO>
{
  async handle({
    txHash,
    player,
    playerId,
  }: DepositTokensControllerRequestDTO): Promise<HttpResponse> {
    try {
      const depositTokensBusinessLogic = container.resolve(
        DepositTokensBusinessLogic,
      );

      const result = await depositTokensBusinessLogic.execute({
        txHash,
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
    } catch (error) {
      return fail(error as Error, 'DepositTokens');
    }
  }
}

const depositTokensController = new DepositTokensController();

export { depositTokensController };
