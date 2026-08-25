import { Monkeynaut } from '../../monkeynauts/types';

export type ShipRole = 'fighter' | 'explorer' | 'miner';

export type Ship = {
  id: string;
  name: string;

  role: ShipRole;
  rank: string;

  avatar?: string;
  ownerName?: string;
  id_short?: string;

  bonusDescription: string;
  bonusValue: number;
  
  fuel: string;
  breedCount: string;
  onSale: string;
  canRefuelAtStation: string;

  crewCapacity: number;
  tankCapacity: number;

  ownerId: string;
  playerId: string;

  crew: Monkeynaut[];
}

export type GetShip = Ship[];

export type GetUniqueShip = {
  ship: Ship | null;
}
