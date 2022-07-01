import { PlayerNotFoundError } from '@modules/players/core/business-logic/errors/player-not-fount-error';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import {
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from '@shared/core/infra/http-response';
import { IMiddleware } from '@shared/core/infra/middleware';
import { prisma } from '@shared/infra/database/prisma/client';
import { InvalidAdminError } from './errors/invalid-admin-error';

type EnsureAdministratorMiddlewareRequestDTO = {
  player: {
    id: string;
  };
};

class EnsureAdministratorMiddleware
  implements IMiddleware<EnsureAdministratorMiddlewareRequestDTO>
{
  async handle(
    request: EnsureAdministratorMiddlewareRequestDTO,
  ): Promise<HttpResponse> {
    const playerId = request.player.id;

    const player = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
    });

    if (!player) {
      return unauthorized(new PlayerNotFoundError());
    }

    if (player.role === PlayerRole.Admin || player.role === PlayerRole.Owner) {
      return ok();
    }

    return forbidden(new InvalidAdminError());
  }
}

const ensureAdministratorMiddleware = new EnsureAdministratorMiddleware();

export { ensureAdministratorMiddleware };
