import { compare, hash } from 'bcrypt';

import { User } from '@modules/users/domain/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';

@injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    @inject('UserRepository') private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    newPassword: string,
  ): Promise<Omit<User, 'id'>> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Combinação inválida', 409, 'validation');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Combinação inválida', 409, 'validation');
    }

    user.password = await hash(newPassword, 8);

    const updatedUser = await this.usersRepository.updatePassword(user);

    delete updatedUser.password;

    return updatedUser;
  }
}
