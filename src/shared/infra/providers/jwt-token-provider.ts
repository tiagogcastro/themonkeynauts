import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { Player } from '@modules/players/domain/entities/player';
import { PlayerAuth } from '@modules/players/domain/entities/player-auth';

import { ITokenProvider } from '@shared/domain/providers/token-provider';

import { authConfig } from '../../../config/auth';

export class JWTokenProvider implements ITokenProvider {
  verify<T = JwtPayload>(token: string): T {
    const { secret } = authConfig;

    return verify(token, secret) as T;
  }

  generate(playerAuth: PlayerAuth, player?: Player): string {
    const { secret, expiresIn } = authConfig;

    const token = sign({
      ...playerAuth
    }, secret, {
      expiresIn,
    });

    return token;
  }
}
