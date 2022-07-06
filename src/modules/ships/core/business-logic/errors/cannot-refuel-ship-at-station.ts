export class CannotRefuelShipAtStationError extends Error {
  constructor() {
    super('You cannot refuel this ship at the station');

    this.name = 'CannotRefuelShipAtStationError';
  }
}
