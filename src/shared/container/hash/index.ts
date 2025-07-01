import { container } from 'tsyringe';

import { HashProvider } from '../../providers/hash/implementations/BCryptHashProvider';
import { IHashProvider } from '../../providers/hash/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
