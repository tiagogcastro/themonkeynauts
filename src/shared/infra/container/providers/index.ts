import { mailConfig } from '@config/mail';
import { IBlockchainProvider } from '@shared/domain/providers/blockchain-provider';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { IMailProvider } from '@shared/domain/providers/mail-provider';
import { IMailTemplateProvider } from '@shared/domain/providers/mail-template-provider';
import { IStorageProvider } from '@shared/domain/providers/storage-provider';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { BCryptHashProvider } from '@shared/infra/providers/bcrypt-hash-provider';
import { DateFnsDateProvider } from '@shared/infra/providers/datefns-date-provider';
import { DiskStorageProvider } from '@shared/infra/providers/disk-storage-provider';
import { EtherealMailProvider } from '@shared/infra/providers/ethereal-mail-provider';
import { HandlebarsMailTemplateProvider } from '@shared/infra/providers/handlebars-mail-template-provider';
import { JWTokenProvider } from '@shared/infra/providers/jwt-token-provider';
import { SESMailProvider } from '@shared/infra/providers/ses-mail-provider';
import { Web3jsBlockchainProvider } from '@shared/infra/providers/web3js-blockchain-provider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTokenProvider);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IDateProvider>('DateProvider', DateFnsDateProvider);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const MailProvider = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
}[mailConfig.driver];

container.registerSingleton<IMailProvider>('MailProvider', MailProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IBlockchainProvider>(
  'BlockchainProvider',
  Web3jsBlockchainProvider,
);
