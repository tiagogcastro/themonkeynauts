import { Resource } from '@modules/players/domain/entities/resource';
import { AsyncMaybe } from '@shared/types/maybe';

interface IResourcesRepository {
  findByPlayerId(player_id: string): AsyncMaybe<Resource>;
  create(player: Resource): Promise<void>;
  save(player: Resource): Promise<void>;
}

export { IResourcesRepository };
