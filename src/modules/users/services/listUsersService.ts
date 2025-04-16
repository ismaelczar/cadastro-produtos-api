import { HttpResponse } from '../../../@types/httpResponse';
import { User } from '../infra/typeorm/entities/user';
import { IUsersRepository } from '../repositories/protocols';

export class ListUsersService {
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
