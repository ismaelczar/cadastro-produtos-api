import { container } from 'tsyringe';

import { RedisProvider } from '@shared/providers/redis/RedisProvider';
import { IRedisProvider } from '@shared/providers/redis/IRedisProvider';

container.registerSingleton<IRedisProvider>('IRedisProvider', RedisProvider);
