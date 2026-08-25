export class ShipNotFoundError extends Error {
  constructor() {
    super('Ship does not exist');

    this.name = 'ShipNotFoundError';
  }
}
