import { AsyncMaybe } from '@shared/types/maybe';
import { IPlayerToken } from '../entities/player-token';

export interface IPlayerTokensRepository {
  generate(playerToken: IPlayerToken): Promise<void>;
  findByToken(token: string): AsyncMaybe<IPlayerToken>;
  findByPlayerId(player_id: string): AsyncMaybe<IPlayerToken>;
  destroy(player_token_id: string): Promise<void>;
}
