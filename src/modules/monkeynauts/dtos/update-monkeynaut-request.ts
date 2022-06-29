import { MonkeynautRole, MonkeynautRank } from '../domain/enums';

type UpdateMonkeynautRequestDTO = {
  bonusDescription?: string;
  bonusValue?: number;

  breedCount?: number;

  role?: MonkeynautRole;
  rank?: MonkeynautRank;

  avatar?: string;

  energy?: number;
  maxEnergy?: number;

  baseAttributes?: {
    baseHealth?: number;
    basePower?: number;
    baseResistence?: number;
    baseSpeed?: number;
  };

  attributes?: {
    health?: number;
    power?: number;
    resistence?: number;
    speed?: number;
  };

  name?: string;
  playerId?: string;
  ownerId: string;

  monkeynautId: string;
};

export { UpdateMonkeynautRequestDTO };
