import path from 'path';
import fs from 'fs';
import uploadConfig from '@shared/config/upload';
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

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.ormRepo.save(user);

    console.log(user);
  }
}
