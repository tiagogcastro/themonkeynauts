import { IShip } from '../entities/ship';

interface IShipsRepository {
  create(ship: IShip): Promise<void>;
  save(ship: IShip): Promise<void>;
  destroy(ship_id: string): Promise<void>;
  listAllShips(): Promise<IShip[]>;
  listAllShipsFromPlayer(player_id: string): Promise<IShip[]>;
}
export { IShipsRepository };
