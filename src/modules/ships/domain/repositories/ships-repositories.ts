import { AsyncMaybe } from '@shared/types/maybe';
import { IShip } from '../entities/ship';

interface IShipsRepository {
  create(ship: IShip): Promise<void>;
  save(ship: IShip): Promise<void>;
  destroy(ship_id: string): Promise<void>;
  findById(ship_id: string): AsyncMaybe<IShip>;
  listAllShips(): Promise<IShip[]>;
  listAllShipsFromPlayer(player_id: string): Promise<IShip[]>;
}
export { IShipsRepository };
