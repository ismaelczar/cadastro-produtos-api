import { User } from '../../models/user';
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

  async create({ fristName, lastName, email, password }: User) {
    try {
      //Verificar se o usuario já existe

      const user = {
        fristName,
        lastName,
        email,
        password,
      };

      await this.userRepository.saveUser(user);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
