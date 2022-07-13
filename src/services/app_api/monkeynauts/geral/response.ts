import { Player } from '../../player/types';
import { Ship } from '../../ships/types';

export type MonkeynautRole = 'soldier' | 'engineer' | 'scientist';

// type Crew = {
//   id: string;
//   shipId: string;
//   monkeynautId: string;
// }

export type Monkeynaut = {
  id: string;
  ownerId: string;
  playerId: string;
  name: string;
  rank: string;
  role: string;

  bonusValue: number;
  bonusDescription?: string;

  maxEnergy: number;
  energy: number;

  basePower: number;
  baseSpeed: number;
  baseResistence: number;
  baseHealth: number;
  
  power: number;
  speed: number;
  resistence: number;
  health: number;
  
  shipId: string;
  
  breedCount: number;

  avatar?: string;
  ownerName?: string;
  id_short?: string;

  crews?: Ship | null;
};

export type GetMonkeynauts = Monkeynaut[];
