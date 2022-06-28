export class InvalidShipFuelError extends Error {
  constructor() {
    super(`You don't have enough ship fuel to start bounty hunts`);

    this.name = 'InvalidShipFuelError';
  }
}
