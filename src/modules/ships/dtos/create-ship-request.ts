import { Maybe } from '@shared/types/maybe';
import { ShipClass } from '../domain/enums/ship-class';
import { ShipRank } from '../domain/enums/ship-rank';

type CreateShipRequestDTO = {
  playerId: string;
  name: Maybe<string>;
  class: Maybe<ShipClass>;
  rank: Maybe<ShipRank>;
  bonusValue: Maybe<number>;
  bonusDescription: Maybe<string>;
  tankCapacity: Maybe<number>;
  crewCapacity: Maybe<number>;
  crew: Maybe<number>;
  fuel: Maybe<number>;
  breedCount: Maybe<number>;
  canRefuelAtStation: Maybe<boolean>;
  onSale: Maybe<boolean>;
};

export { CreateShipRequestDTO };
