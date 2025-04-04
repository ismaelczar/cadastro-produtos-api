import { User } from '../../models/user';
import { IUsersRepository } from './protocols';

import { getRepository } from 'typeorm';

export class UserRepository implements IUsersRepository {
  //   private ormRepository: Repository<User>; // Repositório do TypeORM

  //   constructor() {
  //     this.ormRepository = getRepository(User); // Inicializa uma vez
  //   }

  async findAll(): Promise<User[]> {
    const ormRepository = getRepository(User);

    return await ormRepository.find();
  }

  async create(userData: User): Promise<User> {
    const ormRepository = getRepository(User);

    const user = ormRepository.create(userData);
    return await ormRepository.save(user);
  }
}
