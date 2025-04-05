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

  async updatePassword(
    id: string,
    newPassword: string,
  ): Promise<HttpResponse<User>> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        return {
          statusCode: 400,
          body: 'User not exist',
        };
      }

      user.password = newPassword;

      const updatedUser = await this.userRepository.updatePassword(user);

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

  async remove(id: string): Promise<HttpResponse<string>> {
    try {
      const userId = id;

      const user = this.userRepository.findById(userId);

      if (user) {
        await this.userRepository.delete(userId);
      }

      return {
        statusCode: 200,
        body: 'User removed',
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
