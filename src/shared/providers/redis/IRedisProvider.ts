export interface IRedisProvider {
  save(key: string, value: string): Promise<void>;
  revocer<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
}
