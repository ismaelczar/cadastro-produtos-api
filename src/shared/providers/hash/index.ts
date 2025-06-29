import { container } from 'tsyringe';

import { HashProvider } from './implementations/BCryptHashProvider';
import { IHashProvider } from './IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
