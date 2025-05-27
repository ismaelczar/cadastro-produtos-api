import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { HttpResponse } from '../../../../../shared/responses/httpResponse';
import { LoginResponse } from '@modules/auth/domain/dtos/LoginResponse';

export class LoginUserCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  //TODO: USECASE NÃO DEVERIA SE PREOCUPAR COM STATUSCODE QUEM DEVE RETORNAR É O CONTROLLER.
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
