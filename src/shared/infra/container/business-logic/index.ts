import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';
import { container } from 'tsyringe';

container.registerSingleton(
  'CreateMonkeynautBusinessLogic',
  CreateMonkeynautBusinessLogic,
);

container.registerSingleton('CreateShipBusinessLogic', CreateShipBusinessLogic);
