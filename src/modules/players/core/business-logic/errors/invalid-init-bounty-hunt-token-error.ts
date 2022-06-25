export class InvalidInitBountyHuntTokenError extends Error {
  constructor() {
    super(`You didn't start the bounty hunt to finish it`);

    this.name = 'InvalidInitBountyHuntTokenError';
  }
}
