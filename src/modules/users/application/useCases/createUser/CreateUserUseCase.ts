import { hash } from 'bcrypt';
import { User } from '@modules/users/domain/entities/user';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ firstName, lastName, email, password }: Omit<User, 'id'>) {
    const emailAlreadyRegisteredt = await this.userRepository.findByEmail(
      email,
    );

    if (emailAlreadyRegisteredt) {
      throw new AppError('E-mail já cadastrado', 409, 'validation');
    }

    const hashedPassword = await hash(password, 8);

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
