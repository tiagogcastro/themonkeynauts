export class InvalidShipQuantityError extends Error {
  constructor() {
    super(
      `You have reached the maximum number of ships, buy an asteroid to buy more items`,
    );

    this.name = 'InvalidShipQuantityError';
  }
}
