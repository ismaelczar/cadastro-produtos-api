import path from 'path';
import fs from 'fs';
import uploadConfig from '@shared/config/upload';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { AppError } from '@shared/core/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '@shared/providers/storage/IStorageProvider';

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository') private readonly ormRepo: IUserRepository,

    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,
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
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.ormRepo.save(user);

    return user;
  }
}
