import { IUsersRepository } from '../../repositories/users/protocols';
import { IUserController } from './protocols';

export class UsersController implements IUserController {
  constructor(private readonly userRepository: IUsersRepository) {}

  async list() {
    try {
      const users = await this.userRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }

  create() {}
}
