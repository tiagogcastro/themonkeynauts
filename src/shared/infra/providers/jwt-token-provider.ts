import { IPlayerAuth } from '@modules/players/domain/entities/player-auth';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { authConfig } from '../../../config/auth';

export class JWTokenProvider implements ITokenProvider {
  verify<T = JwtPayload>(token: string): T {
    const { secret } = authConfig;

    return verify(token, secret) as T;
  }

  generate(player_auth: IPlayerAuth): string {
    const { secret, expiresIn } = authConfig;

    const { payload: _, ...rest } = player_auth;

    const token = sign(
      {
        ...rest,
      },
      secret,
      {
        expiresIn,
      },
    );

    return token;
  }
}
