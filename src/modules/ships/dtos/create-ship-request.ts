import { Maybe } from '@shared/core/logic/maybe';
import { ShipClass, TypeShipClass } from '../domain/enums/ship-class';
import { ShipRank, TypeShipRank } from '../domain/enums/ship-rank';

type CreateShipRequestDTO = {
  ownerId: string;
  playerId?: Maybe<string>;
  name?: Maybe<string>;
  class?: Maybe<TypeShipClass>;
  rank?: Maybe<TypeShipRank>;
  bonusValue?: Maybe<number>;
  bonusDescription?: Maybe<string>;
  tankCapacity?: Maybe<number>;
  crewCapacity?: Maybe<number>;
  crew?: Maybe<number>;
  fuel?: Maybe<number>;
  breedCount?: Maybe<number>;
  canRefuelAtStation?: Maybe<boolean>;
  onSale?: Maybe<boolean>;
};

export { CreateShipRequestDTO };
