export class InvalidMonkeynautShipQuantityError extends Error {
  constructor() {
    super(`It is necessary to buy a ship before buying monkeynaut`);

    this.name = 'InvalidMonkeynautShipQuantityError';
  }
}
