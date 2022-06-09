type ConsumeFuelRequestDTO = {
  shipId: string;
  action: 'TRAVEL' | 'BOUNTY_HUNT';
};

export { ConsumeFuelRequestDTO };
