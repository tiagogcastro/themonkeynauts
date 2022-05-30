import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayerAuth } from '@modules/players/domain/entities/player-auth';

export interface ITokenProvider {
  generate(player_auth: IPlayerAuth, player?: IPlayer): string;
  verify<T = any>(token: string): T;
}
