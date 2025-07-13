export interface IRedisProvider {
  save(key: string, value: string): Promise<void>;
  revocer(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}
