import Decimal from 'decimal.js';

const WEI = 1000000000000000000;

const ethToWei = (amount: number) => new Decimal(amount).times(WEI);

export { ethToWei };
