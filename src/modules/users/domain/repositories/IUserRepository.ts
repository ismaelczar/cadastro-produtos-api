import { User } from '../entities/User';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  updatePassword(user: User): Promise<User> | null;
  remove(id: string): Promise<void>;
  save(user: User): Promise<User>;
}
