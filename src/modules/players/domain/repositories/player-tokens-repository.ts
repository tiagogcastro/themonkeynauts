import { AsyncMaybe } from '@shared/types/maybe';
import { PlayerToken } from '../entities/player-token';

export interface IPlayerTokensRepository {
  generate(playerToken: PlayerToken): Promise<void>;
  findByToken(token: string): AsyncMaybe<PlayerToken>;
  findByPlayerId(player_id: string): AsyncMaybe<PlayerToken>;
  destroy(player_token_id: string): Promise<void>;
}
