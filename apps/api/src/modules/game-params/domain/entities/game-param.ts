import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type GameParamPropsOmittedCommons = {
  gameClientVersion: string;
  travelFuelConsuption: number;
  bountyHuntFuelConsuption: number;
  shipRefuelCostInPercentage: number;
  bountyHuntMinReward: number;
  bountyHuntMaxReward: number;
  mineGoldAverageResourceReward: number;
  mineGoldAverageSpcReward: number;
  mineGoldRewardsVariation: number;
  mineIronAverageResourceReward: number;
  mineIronAverageSpcReward: number;
  mineIronRewardsVariation: number;
  mineCopperAverageResourceReward: number;
  mineCopperAverageSpcReward: number;
  mineCooperRewardsVariation: number;
  mineScrapAverageResourceReward: number;
  mineScrapAverageSpcReward: number;
  mineScrapRewardsVariation: number;
};

type GameParamProps = GameParamPropsOmittedCommons & Commons;

type GameParamCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IGameParam extends GameParamProps {
  id: string;
}

export class GameParam implements IGameParam {
  private _id: string;

  private _props: GameParamProps;

  get gameParam(): IGameParam {
    return {
      id: this._id,
      gameClientVersion: this._props.gameClientVersion,
      travelFuelConsuption: this._props.travelFuelConsuption,
      bountyHuntFuelConsuption: this._props.bountyHuntFuelConsuption,
      shipRefuelCostInPercentage: this._props.shipRefuelCostInPercentage,
      bountyHuntMinReward: this._props.bountyHuntMinReward,
      bountyHuntMaxReward: this._props.bountyHuntMaxReward,
      mineGoldAverageResourceReward: this._props.mineGoldAverageResourceReward,
      mineGoldAverageSpcReward: this._props.mineGoldAverageSpcReward,
      mineGoldRewardsVariation: this._props.mineGoldRewardsVariation,
      mineIronAverageResourceReward: this._props.mineIronAverageResourceReward,
      mineIronAverageSpcReward: this._props.mineIronAverageSpcReward,
      mineIronRewardsVariation: this._props.mineIronRewardsVariation,
      mineCopperAverageResourceReward:
        this._props.mineCopperAverageResourceReward,
      mineCopperAverageSpcReward: this._props.mineCopperAverageSpcReward,
      mineCooperRewardsVariation: this._props.mineCooperRewardsVariation,
      mineScrapAverageResourceReward:
        this._props.mineScrapAverageResourceReward,
      mineScrapAverageSpcReward: this._props.mineScrapAverageSpcReward,
      mineScrapRewardsVariation: this._props.mineScrapRewardsVariation,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<GameParamProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get gameClientVersion(): string {
    return this._props.gameClientVersion;
  }

  get travelFuelConsuption(): number {
    return this._props.travelFuelConsuption;
  }

  get bountyHuntFuelConsuption(): number {
    return this._props.bountyHuntFuelConsuption;
  }

  get shipRefuelCostInPercentage(): number {
    return this._props.shipRefuelCostInPercentage;
  }

  get bountyHuntMinReward(): number {
    return this._props.bountyHuntMinReward;
  }

  get bountyHuntMaxReward(): number {
    return this._props.bountyHuntMaxReward;
  }

  get mineGoldAverageResourceReward(): number {
    return this._props.mineGoldAverageResourceReward;
  }

  get mineGoldAverageSpcReward(): number {
    return this._props.mineGoldAverageSpcReward;
  }

  get mineGoldRewardsVariation(): number {
    return this._props.mineGoldRewardsVariation;
  }

  get mineIronAverageResourceReward(): number {
    return this._props.mineIronAverageResourceReward;
  }

  get mineIronAverageSpcReward(): number {
    return this._props.mineIronAverageSpcReward;
  }

  get mineIronRewardsVariation(): number {
    return this._props.mineIronRewardsVariation;
  }

  get mineCopperAverageResourceReward(): number {
    return this._props.mineCopperAverageResourceReward;
  }

  get mineCopperAverageSpcReward(): number {
    return this._props.mineCopperAverageSpcReward;
  }

  get mineCooperRewardsVariation(): number {
    return this._props.mineCooperRewardsVariation;
  }

  get mineScrapAverageResourceReward(): number {
    return this._props.mineScrapAverageResourceReward;
  }

  get mineScrapAverageSpcReward(): number {
    return this._props.mineScrapAverageSpcReward;
  }

  get mineScrapRewardsVariation(): number {
    return this._props.mineScrapRewardsVariation;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: GameParamPropsOmittedCommons, commons?: GameParamCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
