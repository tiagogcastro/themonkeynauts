export type Monkeynaut = {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  class: string;
  rank: string
  baseAttributes: {
    skill: number;
    speed: number;
    resistance: number;
    life: number;
    energy: number;
  };
  finalAttributes: {
    skill: number;
    speed: number;
    resistance: number;
    life: number;
    energy: number;
  };
  breedCount: number;
};

export type GetMonkeynauts = {
  monkeynauts: Monkeynaut[];
}
