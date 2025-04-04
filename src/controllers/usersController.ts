import { HttpResponse } from '../@types/httpResponse';
import { User } from '../models/user';
import { IUsersRepository } from '../repositories/users/protocols';

export class UsersController {
  constructor(private readonly userRepository: IUsersRepository) {}

  async getUsers(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.userRepository.findAll();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
