export type Ship = {
  id: string;
  name: string;
  class: string;
  rank: string
  baseAttributes: {
    fuel: number;
  };
  finalAttributes: {
    fuel: number;
  };
}

export type GetShip = {
  ships: Ship[];
}
