import { hash, compare } from 'bcrypt';
import { IHashProvider } from '@modules/users/domain/providers/hashProvider/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
