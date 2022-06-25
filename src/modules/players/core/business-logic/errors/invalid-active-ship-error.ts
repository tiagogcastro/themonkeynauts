export class InvalidActiveShipError extends Error {
  constructor() {
    super(
      'The player does not have an active ship to finish the bounty hunting run',
    );

    this.name = 'InvalidActiveShipError';
  }
}
