import { HttpResponse } from '@shared/responses/httpResponse';
import { User } from '@modules/users/domain/entities/user';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ListUsersUseCase } from '../listUsers/ListUsersUseCase';
import { UpdatedPasswordUserUseCase } from '../updatedPasswordUser/UpdatedPasswordUserUseCase';
import { RemoveUserUseCase } from '../removeUser/RemoveUserUseCase';

export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updatedPasswordUserUseCase: UpdatedPasswordUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  async getUsers(): Promise<HttpResponse<User[]>> {
    return await this.listUsersUseCase.execute();
  }

  async createUser(user: User): Promise<HttpResponse<User>> {
    return await this.createUserUseCase.execute(user);
  }

  async updatePassword(
    id: string,
    password: string,
    newPassword: string,
  ): Promise<HttpResponse<User>> {
    return await this.updatedPasswordUserUseCase.execute(
      id,
      password,
      newPassword,
    );
  }

  async removeUser(id: string): Promise<HttpResponse<string>> {
    return await this.removeUserUseCase.execute(id);
  }
}
