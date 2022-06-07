type ConsumeFuelRequestDTO = {
  ship_id: string;
  action: 'TRAVEL' | 'BOUNTY_HUNT';
};

export { ConsumeFuelRequestDTO };
