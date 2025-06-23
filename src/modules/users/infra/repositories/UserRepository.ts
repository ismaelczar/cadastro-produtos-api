import { User } from '@modules/users/domain/entities/user';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

import { getRepository } from 'typeorm';

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    return getRepository(User).find();
  }

  async findById(id: string): Promise<User | null> {
    const ormRepository = getRepository(User);

    const user = ormRepository.findOne({
      where: { id: id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormRepository = getRepository(User);
    const user = ormRepository.findOne({
      where: { email: email },
    });

    return user;
  }

  async create(userData: User): Promise<User> {
    const ormRepository = getRepository(User);

    const user = ormRepository.create(userData);

    await ormRepository.save(user);

    return user;
  }

  async updatePassword(user: User): Promise<User> {
    const ormRepository = getRepository(User);

    const updatedUser = await ormRepository.save(user);

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const ormRepository = getRepository(User);

    await ormRepository.delete(id);
  }
}
