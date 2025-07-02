import { UserToken } from '../entities/userToken';

export interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
