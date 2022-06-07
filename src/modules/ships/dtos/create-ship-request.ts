import { ShipClass } from '../domain/enums/ship-class';
import { ShipRank } from '../domain/enums/ship-rank';

type CreateShipRequestDTO = {
  player_id: string;
  name?: string;
  class?: ShipClass;
  rank?: ShipRank;
  bonus_value?: number;
  bonus_description?: string;
  tank_capacity?: number;
  crew_capacity?: number;
  crew?: number;
  fuel?: number;
  avatar?: string;
  breed_count?: number;
  on_sale?: boolean;
};

export { CreateShipRequestDTO };
