import Redis, { Redis as RedisClient } from 'ioredis';
import cashConfig from '@shared/providers/redis/cashHelper';
import { IRedisProvider } from './IRedisProvider';

export class RedisProvider implements IRedisProvider {
  client: RedisClient;

  constructor() {
    this.client = new Redis(cashConfig.config.redis);
  }

  async setChash(
    key: string,
    value: string,
    ttlInSeconds = 300,
  ): Promise<void> {
    this.client.set(key, value, 'EX', ttlInSeconds);
  }

  async get<T>(key: string): Promise<T | null> {
    const date = await this.client.get(key);

    if (!date) {
      return null;
    }
    return JSON.parse(date) as T;
  }

  async deleteChash(key: string): Promise<void> {
    await this.client.del(key);
  }
}
