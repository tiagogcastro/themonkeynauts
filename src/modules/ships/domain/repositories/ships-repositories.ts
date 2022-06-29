import { ICrew } from '@modules/crews/domain/entities/crew';
import { ShipsSaveManyDTO } from '@modules/ships/dtos/ships-save-many';
import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IShip } from '../entities/ship';

interface IShipsRepository {
  create(ship: IShip): Promise<void>;
  save(ship: IShip): Promise<void>;
  saveMany(data: ShipsSaveManyDTO): Promise<void>;
  destroy(shipId: string): Promise<void>;
  findById(shipId: string): AsyncMaybe<IShip & { crew: ICrew[] }>;
  listAllShips(): Promise<(IShip & { crew: ICrew[] })[]>;
  listAllShipsFromPlayer(
    playerId: string,
  ): Promise<(IShip & { crew: ICrew[] })[]>;

  findByIdAndPlayerId(
    shipId: string,
    playerId: string,
  ): AsyncMaybe<IShip & { crew: ICrew[] }>;
}
export { IShipsRepository };
