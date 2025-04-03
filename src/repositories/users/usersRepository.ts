import { User } from '../../models/user';
import { IUsersRepository } from './protocols';

export class UserRepository implements IUsersRepository {
  //TODO: Vincular este repositorio ao banco de dados.
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

  async saveUser(userData: User): Promise<User> {
    const user = userData;
    await repositorio.save(user);
  }
}
