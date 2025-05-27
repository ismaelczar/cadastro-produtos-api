import { HttpResponse } from '../../../../../shared/responses/httpResponse';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

export class RemoveUserUseCase {
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
