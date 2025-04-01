import { User } from '../../models/user';
import { IGetUsersRepository } from './protocols';

export class GetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        fristName: 'Ismael',
        lastName: 'Cezar',
        email: 'ismael@gmail.com',
        password: '123',
      },
    ];
  }
}
