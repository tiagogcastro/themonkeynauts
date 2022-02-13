import { Ship } from '../../ships/types';
import { User } from '../../user/types';

export type MonkeynautRole = 'soldier' | 'engineer' | 'scientist';

export type Monkeynaut = {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  class: MonkeynautRole;
  rank: string;

  avatar?: string;
  ownerName?: string;
  id_short?: string;
  shipId: string;

  crew_in_ship?: Ship | null;

  attributes: {
    skill: number;
    speed: number;
    resistance: number;
    life: number;
    maxEnergy: number;
    currentEnergy: number;
  };
  
  bonus: {
    description: string;
    value: number;
  };
  
  breedCount: number;

  owner: User;
  operator: User;
};

export type GetMonkeynauts = {
  monkeynauts: Monkeynaut[];
}
