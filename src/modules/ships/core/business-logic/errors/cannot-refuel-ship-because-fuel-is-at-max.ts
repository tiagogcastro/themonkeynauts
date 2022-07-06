export class CannotRefuelBecauseIsAtMaxError extends Error {
  constructor() {
    super('It is not possible to refuel the ship because the fuel is 100%');

    this.name = 'CannotRefuelBecauseIsAtMaxError';
  }
}
