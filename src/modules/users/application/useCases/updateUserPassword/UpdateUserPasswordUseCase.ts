import { User } from '@modules/users/domain/entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';
import { instanceToInstance } from 'class-transformer';

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
    const userExist = await this.usersRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('Usuário não encontrado', 409, 'validation');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userExist.password,
    );

    if (!passwordMatched) {
      throw new AppError('Senha inválida', 409, 'validation');
    }

    userExist.password = await this.hashProvider.generateHash(newPassword);

    const updatedUser = await this.usersRepository.updatePassword(userExist);

    return instanceToInstance(updatedUser);
  }
}
