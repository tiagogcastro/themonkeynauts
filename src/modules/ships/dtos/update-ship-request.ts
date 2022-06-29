import { ShipRole } from '../domain/enums/ship-role';
import { ShipRank } from '../domain/enums/ship-rank';

type UpdateShipRequestDTO = {
  shipId: string;
  ownerId?: string;
  playerId?: string;
  name?: string;
  role?: ShipRole;
  rank?: ShipRank;
  bonusValue?: number;
  bonusDescription?: string;
  tankCapacity?: number;
  crewCapacity?: number;
  fuel?: number;
  breedCount?: number;
  canRefuelAtStation?: boolean;
  onSale?: boolean;
};

export { UpdateShipRequestDTO };
