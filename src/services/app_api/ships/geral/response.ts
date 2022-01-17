export type ShipRole = 'fighter' | 'explorer' | 'miner';

export type Ship = {
  id: string;
  name: string;
  class: ShipRole;
  rank: string;

  avatar?: string;
  
  baseAttributes: {
    fuel: number;
  };
  finalAttributes: {
    fuel: number;
  };
}

export type GetShip = {
  ships: Ship[];
}
