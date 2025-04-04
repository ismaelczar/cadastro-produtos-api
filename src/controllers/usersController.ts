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

  async createUser({
    firstName,
    lastName,
    email,
    password,
  }: Omit<User, 'id'>): Promise<HttpResponse<User>> {
    try {
      const userIndex = await this.userRepository.findByEmail(email);
      console.log('1');

      if (userIndex) {
        return {
          statusCode: 409,
          body: 'Email is already in use.',
        };
      }

      const user = {
        firstName,
        lastName,
        email,
        password,
      };

      this.userRepository.create(user);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
