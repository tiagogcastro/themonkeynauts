import { mailConfig } from '@/config/mail';
import { IBlockchainProvider } from '@/shared/domain/providers/blockchain-provider';
import { ICronJobProvider } from '@/shared/domain/providers/cronjob-provider';
import { IDateProvider } from '@/shared/domain/providers/date-provider';
import { IHashProvider } from '@/shared/domain/providers/hash-provider';
import { IMailProvider } from '@/shared/domain/providers/mail-provider';
import { IMailTemplateProvider } from '@/shared/domain/providers/mail-template-provider';
import { ITokenProvider } from '@/shared/domain/providers/token-provider';
import { BCryptHashProvider } from '@/shared/infra/providers/bcrypt-hash-provider';
import { CronJobProvider } from '@/shared/infra/providers/cronjob-provider';
import { DateFnsDateProvider } from '@/shared/infra/providers/datefns-date-provider';
import { EthersBlockchainProvider } from '@/shared/infra/providers/ethers-blockchain-provider';
import { EtherealMailProvider } from '@/shared/infra/providers/ethereal-mail-provider';
import { HandlebarsMailTemplateProvider } from '@/shared/infra/providers/handlebars-mail-template-provider';
import { JWTokenProvider } from '@/shared/infra/providers/jwt-token-provider';
import { SandboxBlockchainProvider } from '@/shared/infra/providers/sandbox-blockchain-provider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTokenProvider);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IDateProvider>('DateProvider', DateFnsDateProvider);

container.register<ICronJobProvider>('CronJobProvider', CronJobProvider);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const mailProvider: IMailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
}[mailConfig.driver];

container.registerInstance<IMailProvider>('MailProvider', mailProvider);

// sandbox: fictitious currency, no chain calls (default for local/demo)
// rpc: real BSC integration through ethers
if ((process.env.BLOCKCHAIN_DRIVER || 'sandbox') === 'rpc') {
  container.registerSingleton<IBlockchainProvider>(
    'BlockchainProvider',
    EthersBlockchainProvider,
  );
} else {
  container.registerSingleton<IBlockchainProvider>(
    'BlockchainProvider',
    SandboxBlockchainProvider,
  );
}
