import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/core/errors/AppError';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';
import { IRedisProvider } from '@shared/providers/redis/IRedisProvider';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('IRedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('Invalid credentials', 401, 'business');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userExist.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid credentials', 401, 'business');
    }

    const token = sign({ email }, process.env.JWT_SECRET!, {
      subject: `${userExist.id}`,
      expiresIn: '1h',
    });

    const refreshToken = sign({ email }, process.env.JWT_SECRET!, {
      subject: email,
      expiresIn: '1d',
    });

    await this.redisProvider.setChash(
      `refreshToken:${email}`,
      refreshToken,
      60 * 60 * 24,
    ); // 1 day

    return { token, refreshToken };
  }
}
