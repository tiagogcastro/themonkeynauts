export type AddMonkeyToShipParams = {
  params: {
    ship_id: string;
  };
  body: {
    monkeynautId: string;
  };
}

export type DeleteMonkeynautFromShipParams = {
  params: {
    ship_id: string;
    monkeynaut_id: string;
  }
}

export type GetUniqueShipParams = {
  params: {
    shipId: string;
    playerId: string;
  }
}