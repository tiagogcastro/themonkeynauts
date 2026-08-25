import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IPlayerToken } from '../entities/player-token';

export interface IPlayerTokensRepository {
  generate(playerToken: IPlayerToken): Promise<void>;
  findByToken(token: string): AsyncMaybe<IPlayerToken>;
  findByPlayerId(playerId: string): AsyncMaybe<IPlayerToken>;
  destroy(player_token_id: string): Promise<void>;
}
