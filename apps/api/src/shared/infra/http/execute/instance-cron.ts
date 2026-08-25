import 'reflect-metadata';

import { container } from 'tsyringe';

import { ResetEnergyMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/reset-energy-monkeynaut';
import { ResetFuelBusinessLogic } from '@modules/ships/core/business-logic/reset-fuel';

const resetEnergyMonkeynautBusinessLogic = container.resolve(
  ResetEnergyMonkeynautBusinessLogic,
);

const resetFuelBusinessLogic = container.resolve(ResetFuelBusinessLogic);

async function instanceCron() {
  await resetEnergyMonkeynautBusinessLogic.execute();
  await resetFuelBusinessLogic.execute();
}

export { instanceCron };
