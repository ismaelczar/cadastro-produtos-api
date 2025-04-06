import { compare } from 'bcrypt';
import { IUsersRepository } from '../repositories/users/protocols';
import { HttpResponse } from '../@types/httpResponse';
import { User } from '../models/user';

export class AuthenticateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async login(email: string, password: string): Promise<HttpResponse<User>> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        return {
          statusCode: 401,
          body: 'Incorrect email/password comnination.',
        };
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        return {
          statusCode: 401,
          body: 'Incorrect email/password comnination.',
        };
      }

      return {
        statusCode: 200,
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
