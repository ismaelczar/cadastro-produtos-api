import { compare, hash } from 'bcrypt';
import { HttpResponse } from '@shared/responses/httpResponse';
import { User } from '@modules/users/domain/entities/user';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

export class UpdatedPasswordUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

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
