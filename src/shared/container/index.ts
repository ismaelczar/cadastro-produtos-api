import { container } from 'tsyringe';

import './hash';

import { UserRepository } from '@modules/users/infra/repositories/UserRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

import { ProductRepository } from '@modules/products/infra/repositories/ProductRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
