import 'reflect-metadata';
import '@shared/infra/container';
import { CreatePlayerBusinessLogic } from '@modules/players/core/business-logic/create-player';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { container } from 'tsyringe';

const main = async () => {
  const createPlayerBusinessLogic = container.resolve(
    CreatePlayerBusinessLogic,
  );

  await createPlayerBusinessLogic.execute({
    nickname: process.env.ADMIN_NICKNAME || '*****',
    email: process.env.ADMIN_EMAIL || '******@*****.****',
    role: PlayerRole.ADMIN,
    password: process.env.ADMIN_PASS || '********',
  });
};

main()
  .catch(error => console.error(error))
  .finally(() => console.log('Seeders up!'));
