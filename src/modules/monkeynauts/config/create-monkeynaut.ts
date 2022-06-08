import { getPercentageInt, rarity } from '@shared/helpers';

type AttributesBase = {
  baseHealth: number;
  baseSpeed: number;
  basePower: number;
  baseResistence: number;
};

type GetAttributesByBase = AttributesBase & {
  percentage: number;
};

const ranksPercentageToBonus = {
  PRIVATE: 0,
  SERGEANT: 0.15,
  CAPTAIN: 0.3,
  MAJOR: 0.45,
};

// Add rank and base * percentage
function getRanksByBase(base: number) {
  return {
    PRIVATE: base * 0,
    SERGEANT: base * 0.1,
    CAPTAIN: base * 0.2,
    MAJOR: base * 0.3,
  };
}

async function getClassByRarity() {
  return rarity({
    soldier: 40,
    engineer: 30,
    scientist: 30,
  });
}

async function getRankByRarity() {
  return rarity({
    private: 50,
    sergeant: 30,
    captain: 15,
    major: 5,
  });
}

function getAttributesByBase({
  baseHealth,
  baseSpeed,
  basePower,
  baseResistence,

  percentage,
}: GetAttributesByBase) {
  return {
    health:
      baseHealth +
      getPercentageInt({
        percentage,
        value: baseHealth,
      }),
    speed:
      baseSpeed +
      getPercentageInt({
        percentage,
        value: baseSpeed,
      }),
    power:
      basePower +
      getPercentageInt({
        percentage,
        value: basePower,
      }),
    resistence:
      baseResistence +
      getPercentageInt({
        percentage,
        value: baseResistence,
      }),
  };
}

function getRanksSchema({
  basePower,
  baseResistence,
  baseSpeed,
}: AttributesBase) {
  return {
    SOLDIER: getRanksByBase(basePower),
    ENGINEER: getRanksByBase(baseResistence),
    SCIENTIST: getRanksByBase(baseSpeed),
  };
}

export {
  getClassByRarity,
  getRankByRarity,
  ranksPercentageToBonus,
  getAttributesByBase,
  getRanksSchema,
};
