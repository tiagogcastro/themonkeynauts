import { AsyncMaybe } from '@shared/types/maybe';
import { PlayerAuth } from '../entities/player-auth';

export interface IAppPlayerAuthRepository {
  create(player_auth: PlayerAuth): AsyncMaybe<PlayerAuth>;

  findUniqueByPayload(payload: string): AsyncMaybe<PlayerAuth>;
  findFirstByPlayerId(player_id: string): AsyncMaybe<PlayerAuth>;
  findByPlayerIdAndPayload(player_id: string, payload: string): AsyncMaybe<PlayerAuth>;
  findManyByPlayerId(player_id: string): AsyncMaybe<PlayerAuth[]>;
  findById(id: string): AsyncMaybe<PlayerAuth>;

  verifyIsValidToken(payload: string): AsyncMaybe<boolean>;

  update(player_auth: PlayerAuth): AsyncMaybe<PlayerAuth>;

  destroy(player_auth_id: string): Promise<void>;
}
