import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { container } from 'tsyringe';

import { IPlayerTokensRepository } from '@modules/players/domain/repositories/player-tokens-repository';
import { PrismaPlayerTokensRepository } from '@modules/players/infra/database/prisma/repositories/prisma-player-tokens-repository';
import { PrismaPlayersRepository } from '@modules/players/infra/database/prisma/repositories/prisma-players-repository';
import { PrismaResourcesRepository } from '@modules/players/infra/database/prisma/repositories/prisma-resources-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { PrismaLogsRepository } from '@modules/logs/infra/database/prisma/repositories/prisma-logs-repositories';
import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { PrismaAppPlayerAuthRepository } from '@modules/players/infra/database/prisma/repositories/prisma-app-player-auth-repository';
import { IPrivateSalesRepository } from '@modules/private-sales/domain/repositories/private-sales-repositories';
import { PrismaPrivateSalesRepository } from '@modules/private-sales/infra/database/prisma/repositories/prisma-private-sale-repositories';
import { PrismaMonkeynautsRepository } from '@modules/monkeynauts/infra/database/prisma/repositories/prisma-monkeynauts-repositories';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { PrismaShipsRepository } from '@modules/ships/infra/database/prisma/repositories/prisma-ships-repositories';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { PrismaMonkeynautSalesRepository } from '@modules/sales/infra/database/prisma/repositories/prisma-monkeynaut-sales-repositories';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { PrismaShipSalesRepository } from '@modules/sales/infra/database/prisma/repositories/prisma-ship-sales-repositories';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { PrismaPackSalesRepository } from '@modules/sales/infra/database/prisma/repositories/prisma-pack-sales-repositories';
import { ICrewsRepository } from '@modules/crews/domain/repositories/crews-repositories';
import { PrismaCrewsRepository } from '@modules/crews/infra/database/prisma/repositories/prisma-crews-repositories';

container.registerSingleton<IPlayersRepository>(
  'PlayersRepository',
  PrismaPlayersRepository,
);

container.registerSingleton<IResourcesRepository>(
  'ResourcesRepository',
  PrismaResourcesRepository,
);

container.registerSingleton<IPlayerTokensRepository>(
  'PlayerTokensRepository',
  PrismaPlayerTokensRepository,
);

container.registerSingleton<ILogsRepository>(
  'LogsRepository',
  PrismaLogsRepository,
);

container.registerSingleton<IAppPlayerAuthRepository>(
  'AppPlayerAuthRepository',
  PrismaAppPlayerAuthRepository,
);

container.registerSingleton<IPrivateSalesRepository>(
  'PrivateSalesRepository',
  PrismaPrivateSalesRepository,
);

container.registerSingleton<IMonkeynautsRepository>(
  'MonkeynautsRepository',
  PrismaMonkeynautsRepository,
);

container.registerSingleton<IShipsRepository>(
  'ShipsRepository',
  PrismaShipsRepository,
);

container.registerSingleton<IMonkeynautSalesRepository>(
  'MonkeynautSalesRepository',
  PrismaMonkeynautSalesRepository,
);

container.registerSingleton<IShipSalesRepository>(
  'ShipSalesRepository',
  PrismaShipSalesRepository,
);

container.registerSingleton<ICrewsRepository>(
  'CrewsRepository',
  PrismaCrewsRepository,
);

container.registerSingleton<IPackSalesRepository>(
  'PackSalesRepository',
  PrismaPackSalesRepository,
);
