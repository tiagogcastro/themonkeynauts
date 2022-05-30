import { AsyncMaybe } from '@shared/types/maybe';
import { IPlayerAuth } from '../entities/player-auth';

export interface IAppPlayerAuthRepository {
  create(player_auth: IPlayerAuth): Promise<void>;

  findUniqueByPayload(payload: string): AsyncMaybe<IPlayerAuth>;
  findFirstByPlayerId(player_id: string): AsyncMaybe<IPlayerAuth>;
  findByPlayerIdAndPayload(
    player_id: string,
    payload: string,
  ): AsyncMaybe<IPlayerAuth>;
  findManyByPlayerId(player_id: string): Promise<IPlayerAuth[]>;
  findById(id: string): AsyncMaybe<IPlayerAuth>;

  verifyIsValidToken(payload: string): Promise<boolean>;

  update(player_auth: IPlayerAuth): Promise<void>;

  destroy(player_auth_id: string): Promise<void>;
}
