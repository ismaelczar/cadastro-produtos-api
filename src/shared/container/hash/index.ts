import { container } from 'tsyringe';

import { HashProvider } from '@modules/users/domain/providers/hashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '@modules/users/domain/providers/hashProvider/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
