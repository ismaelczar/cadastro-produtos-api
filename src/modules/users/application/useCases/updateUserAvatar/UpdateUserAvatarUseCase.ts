import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { AppError } from '@shared/core/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository') private readonly ormRepo: IUserRepository,
  ) {}

  async execute(id: string, avatarFilename: string) {
    const user = await this.ormRepo.findById(id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change avatar',
        409,
        'validation',
      );
    }
  }
}
