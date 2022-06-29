import { Maybe } from '@shared/core/logic/maybe';
import { ShipRole } from '../domain/enums/ship-role';
import { ShipRank } from '../domain/enums/ship-rank';

type CreateShipRequestDTO = {
  ownerId: string;
  playerId?: Maybe<string>;
  name?: Maybe<string>;
  role?: Maybe<ShipRole>;
  rank?: Maybe<ShipRank>;
  bonusValue?: Maybe<number>;
  bonusDescription?: Maybe<string>;
  tankCapacity?: Maybe<number>;
  crewCapacity?: Maybe<number>;
  fuel?: Maybe<number>;
  breedCount?: Maybe<number>;
  canRefuelAtStation?: Maybe<boolean>;
  onSale?: Maybe<boolean>;
};

export { CreateShipRequestDTO };
