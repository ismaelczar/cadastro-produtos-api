import { User } from '@modules/users/domain/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';

@injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    @inject('UserRepository') private readonly usersRepository: IUserRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider,
  ) {}

  async execute(
    email: string,
    password: string,
    newPassword: string,
  ): Promise<Omit<User, 'id'>> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado', 409, 'validation');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Senha inválida', 409, 'validation');
    }

    user.password = await this.hashProvider.generateHash(newPassword);

    const updatedUser = await this.usersRepository.updatePassword(user);

    delete updatedUser.password;

    return updatedUser;
  }
}
