import { rarity } from '@shared/helpers';

const percentage = 100 / 3;

async function getShipClassByRarity() {
  return rarity({
    explorer: percentage,
    miner: percentage,
    fighter: percentage,
  });
}

async function getShipRankByRarity() {
  return rarity({
    a: 50,
    b: 35,
    s: 15,
  });
}

export { getShipClassByRarity, getShipRankByRarity };
