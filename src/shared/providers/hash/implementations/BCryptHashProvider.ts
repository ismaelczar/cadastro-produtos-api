import { hash, compare } from 'bcrypt';
import IHashProvider from '../IHashProvider';

export class HashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
