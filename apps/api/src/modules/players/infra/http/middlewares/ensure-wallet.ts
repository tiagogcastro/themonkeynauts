import { EnsureWalletBusinessLogic } from '@modules/players/core/business-logic/ensure-wallet';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { IMiddleware } from '@shared/core/infra/middleware';

import { container } from 'tsyringe';

type EnsureWalletMiddlewareRequestDTO = {
  player: {
    id: string;
  };
};

class EnsureWalletMiddleware
  implements IMiddleware<EnsureWalletMiddlewareRequestDTO>
{
  async handle(
    request: EnsureWalletMiddlewareRequestDTO,
  ): Promise<HttpResponse> {
    const playerId = request.player.id;

    const ensureWalletBusinessLogic = container.resolve(
      EnsureWalletBusinessLogic,
    );

    const result = await ensureWalletBusinessLogic.execute({
      playerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok();
  }
}
const ensureWalletMiddleware = new EnsureWalletMiddleware();

export { ensureWalletMiddleware };
