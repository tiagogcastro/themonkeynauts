import { AsyncMaybe } from '@shared/types/maybe';
import { IMonkeynaut } from '../entities/monkeynaut';

interface IMonkeynautsRepository {
  create(monkeynaut: IMonkeynaut): Promise<void>;
  save(monkeynaut: IMonkeynaut): Promise<void>;
  update(monkeynaut: IMonkeynaut): Promise<void>;
  destroy(monkeynaut_id: string): Promise<void>;
  listAllMonkeynauts(): Promise<IMonkeynaut[]>;
  listAllMonkeynautsFromPlayer(player_id: string): Promise<IMonkeynaut[]>;
  findById(monkeynaut_id: string): AsyncMaybe<IMonkeynaut>;
}
export { IMonkeynautsRepository };
