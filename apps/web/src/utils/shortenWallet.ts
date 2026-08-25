/**
 * EVM address short display: 0xf009...565a
 */
export function shortenWallet(address: string): string {
  if (address.length < 12) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
