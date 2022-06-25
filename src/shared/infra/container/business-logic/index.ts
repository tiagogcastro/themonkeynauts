import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { HandleBountyHuntRankBusinessLogic } from '@modules/players/core/business-logic/handle-bounty-hunt-rank';
import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';
import { container } from 'tsyringe';

container.registerSingleton(
  'CreateMonkeynautBusinessLogic',
  CreateMonkeynautBusinessLogic,
);

container.registerSingleton(
  'HandleBountyHuntRankBusinessLogic',
  HandleBountyHuntRankBusinessLogic,
);

container.registerSingleton('CreateShipBusinessLogic', CreateShipBusinessLogic);
