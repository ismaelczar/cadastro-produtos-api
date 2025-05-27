import { HttpResponse } from '@shared/responses/httpResponse';
import { User } from '@modules/users/domain/entities/user';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

export class ListUsersUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

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
