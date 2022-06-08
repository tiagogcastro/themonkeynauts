import { MonkeynautClass, MonkeynautRank } from '../domain/enums';

type UpdateMonkeynautRequestDTO = {
  bonus_description?: string;
  bonus_value?: number;

  breed_count?: number;

  class?: MonkeynautClass;
  rank?: MonkeynautRank;

  avatar?: string;

  energy?: number;
  max_energy?: number;

  base_attributes?: {
    base_health?: number;
    base_power?: number;
    base_resistence?: number;
    base_speed?: number;
  };

  attributes?: {
    health?: number;
    power?: number;
    resistence?: number;
    speed?: number;
  };

  name?: string;
  player_id?: string;
  owner_id: string;

  monkeynaut_id: string;
};

export { UpdateMonkeynautRequestDTO };
