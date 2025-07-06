import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/auth/domain/repositories/IUserTokensRepository';
import { AppError } from '@shared/core/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(token: string, newPassword: string) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token inexistente.', 401, 'validation');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuario inexistente.', 401, 'validation');
    }

    const hashedPassword = await this.hashProvider.generateHash(newPassword);

    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}
