import crypto from 'node:crypto';

import { Commons } from '@shared/types/commons';

type BountyHuntRankingPropsOmittedCommons = {
  playerId: string;
  maxPoints: number;
};

type BountyHuntRankingProps = BountyHuntRankingPropsOmittedCommons & Commons;

type BountyHuntRankingCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IBountyHuntRanking extends BountyHuntRankingProps {
  id: string;
}

export class BountyHuntRanking implements IBountyHuntRanking {
  private _id: string;

  private _props: BountyHuntRankingProps;

  get bountyHuntRanking(): IBountyHuntRanking {
    return {
      id: this._id,
      playerId: this._props.playerId,
      maxPoints: this._props.maxPoints,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<BountyHuntRankingProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get maxPoints(): number {
    return this._props.maxPoints;
  }

  get playerId(): string {
    return this._props.playerId;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: BountyHuntRankingPropsOmittedCommons,
    commons?: BountyHuntRankingCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
