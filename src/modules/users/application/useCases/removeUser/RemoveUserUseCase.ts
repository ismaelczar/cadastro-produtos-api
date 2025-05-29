import { HttpResponse } from '../../../../../shared/responses/httpResponse';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';

export class RemoveUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

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
