import { Monkeynaut } from '../../monkeynauts/types';
import { User } from '../../user/types';

export type ShipRole = 'fighter' | 'explorer' | 'miner';

export type Ship = {
  id: string;
  name: string;
  class: ShipRole;
  rank: string;

  avatar?: string;
  ownerName?: string;
  id_short?: string;
  
  attributes: {
    maxFuel: number;
    currentFuel: number;
  };
  
  owner: User;
  operator: User;

  crew: Monkeynaut[];
}

export type GetShip = {
  ships: Ship[];
}
