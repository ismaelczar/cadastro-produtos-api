import Redis, { Redis as RedisClient } from 'ioredis';
import cashConfig from '@shared/config/cash';
import { IRedisProvider } from './IRedisProvider';

export class RedisProvider implements IRedisProvider {
  client: RedisClient;
  constructor() {
    this.client = new Redis(cashConfig.config.redis);
  }

  async save(key: string, value: string): Promise<void> {
    this.client.set(key, value);
  }

  async revocer(key: string): Promise<string | null> {
    const date = await this.client.get(key);
    if (!date) {
      return null;
    }
    return date;
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
