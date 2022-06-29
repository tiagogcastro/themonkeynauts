type ConsumeFuelRequestDTO = {
  shipId: string;
  playerIp: string;
  action: 'Travel' | 'BountyHunt';
};

export { ConsumeFuelRequestDTO };
