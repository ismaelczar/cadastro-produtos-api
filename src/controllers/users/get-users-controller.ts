import { IGetUsersRepository } from '../../repositories/users/protocols';
import { IGetUsersController } from './protocols';

export class GetUserController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async hangle() {
    try {
      const users = await this.getUsersRepository.getUsers();

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
}
