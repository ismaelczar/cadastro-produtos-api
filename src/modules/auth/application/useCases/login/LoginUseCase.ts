import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/core/errors/AppError';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('E-mail inválido', 409, 'validation');
    }

    const passwordMatched = compare(password, userExist.password);

    if (!passwordMatched) {
      throw new AppError('Senha inválida', 409, 'validation');
    }

    const token = sign({ email: email }, process.env.JWT_SECRET!, {
      subject: email,
      expiresIn: '15min',
    });

    const refreshToken = sign({ email: email }, process.env.JWT_SECRET!, {
      subject: email,
      expiresIn: '7d',
    });

    return { token, refreshToken };
  }
}
