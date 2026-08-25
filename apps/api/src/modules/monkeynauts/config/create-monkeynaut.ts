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
  Private: 0,
  Sergeant: 25,
  Captain: 50,
  Major: 75,
};

// Add rank and base * percentage
function getRanksByBase(base: number) {
  return {
    Private: base * 0,
    Sergeant: base * 0.1,
    Captain: base * 0.2,
    Major: base * 0.3,
  };
}

function getRanksSchema({
  basePower,
  baseResistence,
  baseSpeed,
}: AttributesBase) {
  return {
    Soldier: getRanksByBase(basePower),
    Engineer: getRanksByBase(baseResistence),
    Scientist: getRanksByBase(baseSpeed),
  };
}

function getRoleSchema({
  basePower,
  baseResistence,
  baseSpeed,
}: AttributesBase) {
  return {
    Soldier: basePower * 0.1,
    Engineer: baseResistence * 0.2,
    Scientist: baseSpeed * 0.3,
  };
}

async function getRoleByRarity() {
  return rarity({
    Soldier: 40,
    Engineer: 30,
    Scientist: 30,
  });
}

async function getRankByRarity() {
  return rarity({
    Private: 50,
    Sergeant: 30,
    Captain: 15,
    Major: 5,
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

const bonusRanksValue = {
  Private: 0,
  Sergeant: 5,
  Captain: 10,
  Major: 15,
};

function getBonusValueByRoleAndRank() {
  return {
    Soldier: bonusRanksValue,
    Engineer: bonusRanksValue,
    Scientist: bonusRanksValue,
  };
}

export {
  getRoleByRarity,
  getRankByRarity,
  ranksPercentageToBonus,
  getAttributesByBase,
  getRanksSchema,
  getRoleSchema,
  getBonusValueByRoleAndRank,
};
