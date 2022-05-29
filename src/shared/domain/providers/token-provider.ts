import { Player } from '@modules/players/domain/entities/player';
import { PlayerAuth } from '@modules/players/domain/entities/player-auth';

export interface ITokenProvider {
  generate(playerAuth: PlayerAuth, player?: Player): string;
  verify<T = any>(token: string): T;
}
