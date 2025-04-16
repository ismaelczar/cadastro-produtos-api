import { hash } from 'bcrypt';
import { HttpResponse } from '../../../@types/httpResponse';
import { User } from '../infra/typeorm/entities/user';
import { IUsersRepository } from '../repositories/protocols';

export class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
  }: Omit<User, 'id'>): Promise<HttpResponse<User>> {
    try {
      const userIndex = await this.usersRepository.findByEmail(email);

      if (userIndex) {
        return {
          statusCode: 409,
          body: 'Email is already in use.',
        };
      }

      const hashedPassword = await hash(password, 8);

      const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      };

      this.usersRepository.create(user);

      delete user.password;

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
