import { User } from '@modules/users/domain/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email);
  }

  async create(userData: User): Promise<User> {
    this.users.push(userData);

    return userData;
  }

  async updatePassword(user: User): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    this.users[userIndex] = user;

    return user;
  }

  async remove(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async save(user: User): Promise<User> {
    const userData = user;
    this.users.push(userData);
    return user;
  }
}
