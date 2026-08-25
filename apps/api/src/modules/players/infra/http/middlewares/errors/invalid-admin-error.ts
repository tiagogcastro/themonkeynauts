export class InvalidAdminError extends Error {
  constructor() {
    super('Only administrator can access here');

    this.name = 'InvalidAdminError';
  }
}
