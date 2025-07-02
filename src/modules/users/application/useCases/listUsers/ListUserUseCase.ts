import { User } from '@modules/users/domain/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { AppError } from '@shared/core/errors/AppError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ListUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    if (users.length === 0) {
      throw new AppError('Internal server error', 500, 'infra');
    }

    return users;
  }
}
