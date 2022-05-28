import { Player } from '@modules/players/domain/entities/player';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '../../../config/auth';

export class JWTokenProvider implements ITokenProvider {
  verify(token: string): void {
    const { secret } = authConfig;

    verify(token, secret);
  }

  generate(player: Player): string {
    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: player.id,
      expiresIn,
    });

    return token;
  }
}
