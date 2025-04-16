import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '../repositories/protocols';
import { HttpResponse } from '../../../@types/httpResponse';
import { User } from '../infra/typeorm/entities/user';

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

      const token = sign({}, 'a11113006a7272e0cfad95952e7e62f3', {
        subject: user.id,
        expiresIn: '1d',
      });

      const userAuthenticate = {
        ...user,
        token,
      };

      delete userAuthenticate.password;

      return {
        statusCode: 200,
        body: userAuthenticate,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
