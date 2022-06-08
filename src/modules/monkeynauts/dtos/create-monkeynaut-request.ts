import { MonkeynautClass, MonkeynautRank } from '../domain/enums';

type CreateMonkeynautRequestDTO = {
  bonus_description: string;
  bonus_value: number;

  breed_count: number;

  class: MonkeynautClass;
  rank: MonkeynautRank;

  energy: number;
  max_energy: number;

  base_attributes?: {
    base_health?: number;
    base_power?: number;
    base_resistence?: number;
    base_speed?: number;
  };

  name: string;
  player_id: string;
};

export { CreateMonkeynautRequestDTO };
