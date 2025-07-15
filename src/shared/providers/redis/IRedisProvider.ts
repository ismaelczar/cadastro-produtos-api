export interface IRedisProvider {
  setChash(key: string, value: string, ttlInSeconds: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  deleteChash(key: string): Promise<void>;
}
