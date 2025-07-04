import { UserToken } from '../../../auth/domain/entities/UserToken';

export interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
