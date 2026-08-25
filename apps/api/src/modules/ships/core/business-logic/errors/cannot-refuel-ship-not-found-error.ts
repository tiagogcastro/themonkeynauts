export class CannotRefuelShipFoundError extends Error {
  constructor() {
    super(
      'Could not refuel the ship because the ship you entered does not exist',
    );

    this.name = 'CannotRefuelShipFoundError';
  }
}
