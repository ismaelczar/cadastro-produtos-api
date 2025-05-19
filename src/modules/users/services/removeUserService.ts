import { HttpResponse } from '../../../config/httpResponse';
import { IUsersRepository } from '../repositories/IUsersRepository';

export class RemoveUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<HttpResponse<string>> {
    try {
      const userId = id;

      const user = this.usersRepository.findById(userId);

      if (user) {
        await this.usersRepository.delete(userId);
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
