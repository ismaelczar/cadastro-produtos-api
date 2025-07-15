import { container } from 'tsyringe';

import { UserRepository } from '@modules/users/infra/repositories/UserRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

import { UserTokensRepository } from '@modules/auth/infra/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/auth/domain/repositories/IUserTokensRepository';
import { DiskStorageProvider } from '@shared/providers/storage/services/DiskStorageProvider';

import { IStorageProvider } from '@shared/providers/storage/IStorageProvider';

import { ProductRepository } from '@modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';

import { IMailProvider } from '@shared/providers/mail/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/mail/services/EtherealMailProvider';

import { HashProvider } from '@shared/providers/hash/services/BCryptHashProvider';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';

import { RedisProvider } from '@shared/providers/redis/RedisProvider';
import { IRedisProvider } from '@shared/providers/redis/IRedisProvider';

container.registerSingleton<IRedisProvider>('IRedisProvider', RedisProvider);

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
