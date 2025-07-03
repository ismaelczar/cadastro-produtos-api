import { User } from '@modules/users/domain/entities/User';
import { UserToken } from '@modules/users/domain/entities/UserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

export class FakeUserTokensRepository implements IUserTokensRepository {
  userTokens: UserToken[] = [];

  async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: 'a2916199-6edc-43b2-90a1-21985b5e36e1',
      token: 'a2916199-6edc-43b2-90a1-21985b5e36e1',
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      (findToken) => findToken.token === token,
    );

    return userToken;
  }
}
