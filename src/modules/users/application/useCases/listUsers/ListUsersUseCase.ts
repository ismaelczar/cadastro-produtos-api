import { HttpResponse } from '@shared/responses/httpResponse';
import { User } from '@modules/users/domain/entities/user';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

export class ListUsersUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.usersRepository.findAll();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
