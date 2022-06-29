import { MonkeynautRank, MonkeynautRole } from '../domain/enums';

type CreateMonkeynautRequestDTO = {
  bonusDescription?: string;
  bonusValue?: number;

  breedCount?: number;

  role?: MonkeynautRole;
  rank?: MonkeynautRank;

  energy?: number;
  maxEnergy?: number;

  baseAttributes?: {
    baseHealth?: number;
    basePower?: number;
    baseResistence?: number;
    baseSpeed?: number;
  };

  name?: string;
  playerId?: string;
  ownerId: string;
};

export { CreateMonkeynautRequestDTO };
