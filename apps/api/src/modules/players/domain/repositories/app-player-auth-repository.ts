import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IPlayerAuth } from '../entities/player-auth';

export interface IAppPlayerAuthRepository {
  create(playerAuth: IPlayerAuth): Promise<void>;

  findUniqueByPayload(payload: string): AsyncMaybe<IPlayerAuth>;
  findFirstByPlayerId(playerId: string): AsyncMaybe<IPlayerAuth>;
  findByPlayerIdAndPayload(
    playerId: string,
    payload: string,
  ): AsyncMaybe<IPlayerAuth>;
  findManyByPlayerId(playerId: string): Promise<IPlayerAuth[]>;
  findById(id: string): AsyncMaybe<IPlayerAuth>;

  verifyIsValidToken(payload: string): Promise<boolean>;

  update(playerAuth: IPlayerAuth): Promise<void>;

  destroy(playerAuthId: string): Promise<void>;
}
