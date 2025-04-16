import { HttpResponse } from '../../../../@types/httpResponse';
import { User } from '../../../../modules/users/infra/typeorm/entities/user';
import { CreateUserService } from '../../../../modules/users/services/createUserService';
import { ListUsersService } from '../../../../modules/users/services/listUsersService';
import { RemoveUserService } from '../../../../modules/users/services/removeUserService';
import { UpdatedPasswordUserService } from '../../../../modules/users/services/updatedPasswordUserService';

export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly updatedPasswordUserService: UpdatedPasswordUserService,
    private readonly removeUserService: RemoveUserService,
  ) {}

  async getUsers(): Promise<HttpResponse<User[]>> {
    return await this.listUsersService.execute();
  }

  async createUser(user: User): Promise<HttpResponse<User>> {
    return await this.createUserService.execute(user);
  }

  async updatePassword(
    id: string,
    password: string,
    newPassword: string,
  ): Promise<HttpResponse<User>> {
    return await this.updatedPasswordUserService.execute(
      id,
      password,
      newPassword,
    );
  }

  async removeUser(id: string): Promise<HttpResponse<string>> {
    return await this.removeUserService.execute(id);
  }
}
