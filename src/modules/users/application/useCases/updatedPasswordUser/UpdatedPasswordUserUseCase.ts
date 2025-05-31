import { compare, hash } from 'bcrypt';

import { User } from '@modules/users/domain/entities/user';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';

@injectable()
export class UpdatedPasswordUserUseCase {
  constructor(
    @inject('UserRepository') private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    newPassword: string,
  ): Promise<Omit<User, 'id'>> {
    const user = await this.usersRepository.findByEmail(email);
    const passwordMatched = await compare(password, user.password);

    if (!user || !passwordMatched) {
      throw new AppError('Combinação inválida ', 409, 'validation');
    }

    const hashedPassword = await hash(newPassword, 8);

    user.password = hashedPassword;

    const updatedUser = await this.usersRepository.updatePassword(user);

    delete updatedUser.password;

    return updatedUser;
  }
}
