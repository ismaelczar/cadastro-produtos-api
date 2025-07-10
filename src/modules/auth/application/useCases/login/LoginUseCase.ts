import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/core/errors/AppError';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('E-mail inválido', 409, 'validation');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userExist.password,
    );

    if (!passwordMatched) {
      throw new AppError('Senha inválida', 409, 'validation');
    }

    const token = sign(
      { id: userExist.id, role: userExist.role },
      process.env.JWT_SECRET!,
      {
        subject: String(userExist.id),
        expiresIn: '15min',
      },
    );

    const refreshToken = sign(
      { id: userExist.id, role: userExist.role },
      process.env.JWT_SECRET!,
      {
        subject: String(userExist.id),
        expiresIn: '7d',
      },
    );

    return { token, refreshToken };
  }
}
