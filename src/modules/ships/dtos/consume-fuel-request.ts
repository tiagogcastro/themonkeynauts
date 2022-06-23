type ConsumeFuelRequestDTO = {
  shipId: string;
  playerIp: string;
  action: 'TRAVEL' | 'BOUNTY_HUNT';
};

export { ConsumeFuelRequestDTO };
