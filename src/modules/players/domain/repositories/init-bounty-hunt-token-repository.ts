import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IInitBountyHuntToken } from '../entities/init-bounty-hunt-token';

export interface IInitBountyHuntTokenRepository {
  create(initBountyHunt: IInitBountyHuntToken): Promise<void>;
  save(initBountyHunt: IInitBountyHuntToken): Promise<void>;
  findInitBountyHuntTokenByPlayerId(
    playerId: string,
  ): AsyncMaybe<IInitBountyHuntToken>;
  destroy(initBountyHuntTokenId: string): Promise<void>;
  update(initBountyHuntToken: IInitBountyHuntToken): Promise<void>;
}
