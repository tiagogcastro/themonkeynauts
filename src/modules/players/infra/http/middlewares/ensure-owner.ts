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
import { Request } from 'express';
import { InvalidOwnerError } from './errors/invalid-owner-error';

type EnsureOwnerMiddlewareRequestDTO = {
  player: {
    id: string;
  };
};

class EnsureOwnerMiddleware
  implements IMiddleware<EnsureOwnerMiddlewareRequestDTO>
{
  async handle(
    request: EnsureOwnerMiddlewareRequestDTO,
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

    if (player.role !== PlayerRole.Owner) {
      return forbidden(new InvalidOwnerError());
    }

    return ok();
  }
}

const ensureOwnerMiddleware = new EnsureOwnerMiddleware();

export { ensureOwnerMiddleware };
