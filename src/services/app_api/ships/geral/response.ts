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
    maxDurability: number;
    currentDurability: number;
  };

  bonus: {
    value: number;
    description: string;
  };
  
  owner: User;
  operator: User;

  crew: {
    seats: number;
    monkeynauts: Monkeynaut[];
  };
}

export type GetShip = {
  ships: Ship[];
}

export type GetUniqueShip = {
  ship: Ship | null;
}
