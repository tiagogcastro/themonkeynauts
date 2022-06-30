import { Maybe } from '@shared/core/logic/maybe';
import { ShipRank } from '../domain/enums/ship-rank';
import { ShipRole } from '../domain/enums/ship-role';

export type CommonShipRequestDTO = {
  ownerId: string;
  shipId?: string;

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
