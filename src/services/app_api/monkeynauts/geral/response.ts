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

  baseAttributes: {
    skill: number;
    speed: number;
    resistance: number;
    life: number;
    energy: number;
  };
  finalAttributes: {
    skill: number;
    speed: number;
    resistance: number;
    life: number;
    energy: number;
  };
  breedCount: number;

  owner: User;
  operator: User;
};

export type GetMonkeynauts = {
  monkeynauts: Monkeynaut[];
}
