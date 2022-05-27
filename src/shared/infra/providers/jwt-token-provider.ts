import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '../../../config/auth';

import { IPlayer } from '../../../modules/players/domain/entities/IPlayer';
import { ITokenProvider } from '../ITokenProvider';

export class JWTokenProvider implements ITokenProvider {
  verify(token: string): void {
    const { secret } = authConfig;

    verify(token, secret);
  }

  generate(player: IPlayer): string {
    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: player.id,
      expiresIn,
    });

    return token;
  }
}
