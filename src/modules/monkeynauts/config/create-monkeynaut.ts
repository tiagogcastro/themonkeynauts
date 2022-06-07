import { getRandomInt } from '@shared/helpers';

const baseAttributes = {
  baseHealth: getRandomInt(250, 350),
  baseSpeed: getRandomInt(20, 50),
  basePower: getRandomInt(20, 50),
  baseResistence: getRandomInt(20, 50),
};

const { baseHealth, basePower, baseResistence, baseSpeed } = baseAttributes;

const attributes = {
  baseHealth,
  basePower,
  baseResistence,
  baseSpeed,
};

const ranksSchema = {
  SOLDIER: {
    PRIVATE: basePower * 0,
    SERGEANT: basePower * 0.1,
    CAPTAIN: basePower * 0.2,
    MAJOR: basePower * 0.3,
  },
  ENGINEER: {
    PRIVATE: baseResistence * 0,
    SERGEANT: baseResistence * 0.1,
    CAPTAIN: baseResistence * 0.2,
    MAJOR: baseResistence * 0.3,
  },
  SCIENTIST: {
    PRIVATE: baseSpeed * 0,
    SERGEANT: baseSpeed * 0.1,
    CAPTAIN: baseSpeed * 0.2,
    MAJOR: baseSpeed * 0.3,
  },
};

const classesSchema = {
  SOLDIER: basePower * 0.1,
  ENGINEER: baseResistence * 0.2,
  SCIENTIST: baseSpeed * 0.3,
};

export { baseAttributes, attributes };
