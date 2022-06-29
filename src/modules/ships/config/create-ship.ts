import { rarity } from '@shared/helpers';

const percentage = 100 / 3;

async function getShipRoleByRarity() {
  return rarity({
    Explorer: percentage,
    Miner: percentage,
    Fighter: percentage,
  });
}

async function getShipRankByRarity() {
  return rarity({
    A: 50,
    B: 35,
    S: 15,
  });
}

export { getShipRoleByRarity, getShipRankByRarity };
