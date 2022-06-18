import { MonkeynautClass, MonkeynautRank } from '../domain/enums';

type CreateMonkeynautRequestDTO = {
  bonusDescription?: string;
  bonusValue?: number;

  breedCount?: number;

  class?: MonkeynautClass;
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
