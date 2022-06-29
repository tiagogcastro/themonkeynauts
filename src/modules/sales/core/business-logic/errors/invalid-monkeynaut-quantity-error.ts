export class InvalidMonkeynautQuantityError extends Error {
  constructor() {
    super(
      `You have reached the maximum number of monkeynauts, buy an asteroid to buy more items`,
    );

    this.name = 'InvalidMonkeynautQuantityError';
  }
}
