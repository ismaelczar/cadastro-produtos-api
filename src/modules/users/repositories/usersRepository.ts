import { User } from '../../users/infra/typeorm/entities/user';
import { IUsersRepository } from './protocols';

import { getRepository } from 'typeorm';

export class UserRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    const ormRepository = getRepository(User);

    return await ormRepository.find();
  }

  findById(id: string): Promise<User | null> {
    const ormRepository = getRepository(User);

    const user = ormRepository.findOne({
      where: { id: id },
    });

    return user;
  }

  async create(userData: User): Promise<User> {
    const ormRepository = getRepository(User);

    const user = ormRepository.create(userData);

    await ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormRepository = getRepository(User);
    const user = ormRepository.findOne({
      where: { email: email },
    });

    return user;
  }

  async updatePassword(user: User): Promise<User> {
    const ormRepository = getRepository(User);

    const updatedUser = await ormRepository.save(user);

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const ormRepository = getRepository(User);

    await ormRepository.delete(id);
  }
}
