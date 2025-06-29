import { User } from '@modules/users/domain/entities/user';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';
import { IHashProvider } from '@modules/users/domain/providers/hashProvider/IHashProvider';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('HashProvider')
    private readonly hashProvicer: IHashProvider,
  ) {}

  async execute({ firstName, lastName, email, password }: Omit<User, 'id'>) {
    const emailAlreadyRegisteredt = await this.userRepository.findByEmail(
      email,
    );

    if (emailAlreadyRegisteredt) {
      throw new AppError('E-email já cadastrado', 409, 'validation');
    }

    const hashedPassword = await this.hashProvicer.generateHash(password);

    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    this.userRepository.create(user);

    delete user.password;

    return user;
  }
}
