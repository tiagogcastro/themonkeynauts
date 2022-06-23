export class UserNotFoundError extends Error {
  constructor() {
    super('User does not exist');

    this.name = 'UserNotFoundError';
  }
}
