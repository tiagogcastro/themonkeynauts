import { IResource } from '@modules/players/domain/entities/resource';
import { AsyncMaybe } from '@shared/types/maybe';

interface IResourcesRepository {
  findByPlayerId(player_id: string): AsyncMaybe<IResource>;
  create(resource: IResource): Promise<void>;
  save(resource: IResource): Promise<void>;
}

export { IResourcesRepository };
