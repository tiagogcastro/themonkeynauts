import crypto from 'node:crypto';
import { BCryptHashProvider } from '@shared/infra/providers/bcrypt-hash-provider';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { prisma } from '../client';

const main = async () => {
  const bcryptHashProvider = new BCryptHashProvider();

  const player = await prisma.player.create({
    data: {
      id: crypto.randomUUID(),
      nickname: process.env.ADMIN_NICKNAME || '*****',
      email: process.env.ADMIN_EMAIL || '******@*****.****',
      role: PlayerRole.ADMIN,
      password: await bcryptHashProvider.generateHash(
        process.env.ADMIN_PASS || '*****',
      ),
    },
  });

  await prisma.resource.create({
    data: {
      id: crypto.randomUUID(),
      playerId: player.id,
    },
  });
};

main()
  .catch(error => console.error(error))
  .finally(() => console.log('Seeders up!'));
