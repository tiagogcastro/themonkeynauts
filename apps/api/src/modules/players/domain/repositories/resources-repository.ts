import { IResource } from '@modules/players/domain/entities/resource';
import { AsyncMaybe } from '@shared/core/logic/maybe';

interface IResourcesRepository {
  findByPlayerId(playerId: string): AsyncMaybe<IResource>;
  create(resource: IResource): Promise<void>;
  save(resource: IResource): Promise<void>;
}

export { IResourcesRepository };
