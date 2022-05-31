type CreateShipRequestDTO = {
  ownerId: string;
  playerId: string;
  name: string;
  class: string;
  rank: string;
  bonusValue: number;
  bonusDescription: string;
  tankCapacity: number;
  fuel: number;
  breedCount: number;
  onSale: boolean;
};

export { CreateShipRequestDTO };
