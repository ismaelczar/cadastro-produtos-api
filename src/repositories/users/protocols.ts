import { User } from '../../models/user';

export interface IUsersRepository {
  getUsers(): Promise<User[]>;
}
