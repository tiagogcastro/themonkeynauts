import crypto from 'node:crypto';
import { prisma } from '../client';
import { BCryptHashProvider } from '@shared/infra/providers/bcrypt-hash-provider';


const main = async () => {
    const bcryptHashProvider = new BCryptHashProvider()
    
    await prisma.player.create({
        data: {
            id: crypto.randomUUID(),
            nickname: process.env.ADMIN_NICKNAME || '*****',
            email: process.env.ADMIN_EMAIL || '******@*****.****',
            role: 'admin',
            password: await bcryptHashProvider.generateHash(process.env.ADMIN_PASS || '*****'),
        },
    });
};

main()
  .catch(error => console.error(error))
  .finally(() => console.log('Seeders up!'));
