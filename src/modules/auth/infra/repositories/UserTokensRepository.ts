import { UserToken } from '@modules/auth/domain/entities/UserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

export class UserTokensRepository implements IUserTokensRepository {
  constructor() {}

  //TODO: deve criar um token com o id do usuário.
  generate(user_id: string): Promise<UserToken> {}

  //TODO: Deve retornar o UserToken que tem o token fornecido.
  findByToken(token: string): Promise<UserToken | undefined> {}
}
