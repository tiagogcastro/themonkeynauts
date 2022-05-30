import { IMonkeynaut } from '../entities/monkeynaut';

interface IMonkeynautsRepository {
  create(monkeynaut: IMonkeynaut): Promise<void>;
  save(monkeynaut: IMonkeynaut): Promise<void>;
  destroy(monkeynaut_id: string): Promise<void>;
  listAllMonkeynauts(): Promise<IMonkeynaut[]>;
  listAllMonkeynautsFromPlayer(player_id: string): Promise<IMonkeynaut[]>;
}
export { IMonkeynautsRepository };
