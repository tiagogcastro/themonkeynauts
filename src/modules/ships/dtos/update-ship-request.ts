import { ShipClass } from '../domain/enums/ship-class';
import { ShipRank } from '../domain/enums/ship-rank';

type UpdateShipRequestDTO = {
  shipId: string;
  ownerId?: string;
  playerId?: string;
  name?: string;
  class?: ShipClass;
  rank?: ShipRank;
  bonusValue?: number;
  bonusDescription?: string;
  tankCapacity?: number;
  crewCapacity?: number;
  crew?: number;
  fuel?: number;
  breedCount?: number;
  canRefuelAtStation?: boolean;
  onSale?: boolean;
};

export { UpdateShipRequestDTO };
