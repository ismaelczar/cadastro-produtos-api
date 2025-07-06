import { container } from 'tsyringe';

import { UserTokensRepository } from '@modules/auth/infra/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/auth/domain/repositories/IUserTokensRepository';

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
