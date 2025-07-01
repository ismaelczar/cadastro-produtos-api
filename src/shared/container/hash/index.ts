import { container } from 'tsyringe';

import { HashProvider } from '@shared/providers/hash/BCryptHashProvider';
import { IHashProvider } from '../../providers/hash/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
