import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { AppError } from '@shared/core/errors/AppError';

@injectable()
export class RemoveUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const userId = id;
    const userIndex = this.userRepository.findById(userId);

    if (!userIndex) {
      throw new AppError('Internal server error', 500, 'validation');
    }

    await this.userRepository.delete(userId);
  }
}
