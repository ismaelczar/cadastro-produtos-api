import { User } from '../entities/user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(user: User): Promise<User> | null;
  delete(id: string): Promise<void>;
}
