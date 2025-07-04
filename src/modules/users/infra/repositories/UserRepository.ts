import { User } from '@modules/users/domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

import { getRepository, Repository } from 'typeorm';

export class UserRepository implements IUserRepository {
  ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.ormRepo.find();
  }

  async findById(id: string): Promise<User | null> {
    const user = this.ormRepo.findOne({
      where: { id: id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.ormRepo.findOne({
      where: { email: email },
    });

    return user;
  }

  async create(userData: User): Promise<User> {
    const user = this.ormRepo.create(userData);

    await this.ormRepo.save(user);

    return user;
  }

  async updatePassword(user: User): Promise<User> {
    const updatedUser = await this.ormRepo.save(user);

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async save(user: User): Promise<User> {
    return await this.ormRepo.save(user);
  }
}
