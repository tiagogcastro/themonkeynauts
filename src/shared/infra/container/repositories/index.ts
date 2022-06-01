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
import { IPrivateSaleRepository } from '@modules/private-sales/domain/repositories/private-sales-repositories';
import { PrismaPrivateSalesRepository } from '@modules/private-sales/infra/database/prisma/repositories/prisma-private-sale-repositories';

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

container.registerSingleton<IPrivateSaleRepository>(
  'PrivateSaleRepository',
  PrismaPrivateSalesRepository,
);
