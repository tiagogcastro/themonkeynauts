import { ICrew } from '@modules/crews/domain/entities/crew';
import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IShip } from '../entities/ship';

interface IShipsRepository {
  create(ship: IShip): Promise<void>;
  save(ship: IShip): Promise<void>;
  saveMany(data: Partial<IShip>): Promise<void>;

  resetShipsFuel(): Promise<void>;

  destroy(shipId: string): Promise<void>;

  findMany(): Promise<IShip[]>;

  findById<T extends boolean>(
    shipId: string,
    relationships?: T,
  ): Promise<
    T extends true ? AsyncMaybe<IShip & { crew: ICrew[] }> : AsyncMaybe<IShip>
  >;
  listAllShips(): Promise<IShip[]>;
  listAllShipsFromPlayer(playerId: string): Promise<IShip[]>;

  findByIdAndPlayerId(
    shipId: string,
    playerId: string,
  ): AsyncMaybe<IShip & { crew: ICrew[] }>;
}
export { IShipsRepository };
