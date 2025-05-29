import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { HttpResponse } from '../../../../../shared/responses/httpResponse';
import { LoginResponse } from '@modules/auth/domain/dtos/LoginResponse';
import { injectable, inject } from 'tsyringe';

@injectable()
export class LoginUserCase {
  constructor(
    @inject('UserRepository')
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<HttpResponse<LoginResponse>> {
    try {
      const userExist = await this.usersRepository.findByEmail(email);

      if (!userExist) {
        return {
          statusCode: 401,
          body: 'Incorrect email/password comnination.',
        };
      }

      const passwordMatched = await compare(password, userExist.password);

      if (!passwordMatched) {
        return {
          statusCode: 401,
          body: 'Incorrect email/password comnination.',
        };
      }

      const accessToken = sign({}, 'a11113006a7272e0cfad95952e7e62f3', {
        subject: userExist.id,
        expiresIn: '15m',
      });

      const refreshToken = sign({}, 'a11113006a7272e0cfad95952e7e62f3', {
        subject: userExist.id,
        expiresIn: '7d',
      });

      const userAuthenticate = {
        ...userExist,
        accessToken,
      };

      delete userAuthenticate.password;

      return {
        statusCode: 200,
        body: {
          user: userAuthenticate,
          refreshToken,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
