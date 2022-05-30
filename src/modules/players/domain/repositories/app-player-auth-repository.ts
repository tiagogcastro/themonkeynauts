import { AsyncMaybe } from '@shared/types/maybe';
import { PlayerAuth } from '../entities/player-auth';

export interface IAppPlayerAuthRepository {
  create(player_auth: PlayerAuth): Promise<PlayerAuth>;

  findUniqueByPayload(payload: string): AsyncMaybe<PlayerAuth>;
  findFirstByPlayerId(player_id: string): AsyncMaybe<PlayerAuth>;
  findByPlayerIdAndPayload(
    player_id: string,
    payload: string,
  ): AsyncMaybe<PlayerAuth>;
  findManyByPlayerId(player_id: string): Promise<PlayerAuth[]>;
  findById(id: string): AsyncMaybe<PlayerAuth>;

  verifyIsValidToken(payload: string): Promise<boolean>;

  update(player_auth: PlayerAuth): Promise<PlayerAuth>;

  destroy(player_auth_id: string): Promise<void>;
}
