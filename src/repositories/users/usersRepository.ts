import { User } from '../../models/user';
import { IUsersRepository } from './protocols';

export class UserRepository implements IUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        fristName: 'Ismael',
        lastName: 'Cezar',
        email: 'ismael@gmail.com',
        password: '1234',
      },
    ];
  }
}
