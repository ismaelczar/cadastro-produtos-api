import { compare, hash } from 'bcrypt';
import { HttpResponse } from '../@types/httpResponse';
import { User } from '../models/user';
import { IUsersRepository } from '../repositories/users/protocols';

export class UpdatedPasswordUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(
    id: string,
    password: string,
    newPassword: string,
  ): Promise<HttpResponse<User>> {
    try {
      //TODO: RECEBER A SENHA ATUAL E VERIFICAR SE É VALIDA ANTES DE ATUALIZAR
      const user = await this.usersRepository.findById(id);

      if (!user) {
        return {
          statusCode: 400,
          body: 'User not exist',
        };
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        return {
          statusCode: 400,
          body: 'Incorrect comninationt',
        };
      }

      const hashedPassword = await hash(newPassword, 8);

      user.password = hashedPassword;

      const updatedUser = await this.usersRepository.updatePassword(user);

      delete updatedUser.password;

      return {
        statusCode: 200,
        body: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
