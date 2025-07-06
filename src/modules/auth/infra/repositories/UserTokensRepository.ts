import { UserToken } from '@modules/auth/domain/entities/UserToken';
import { IUserTokensRepository } from '@modules/auth/domain/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';

export class UserTokensRepository implements IUserTokensRepository {
  ormRepo: Repository<UserToken>;

  constructor() {
    this.ormRepo = getRepository(UserToken);
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepo.create({ user_id });

    await this.ormRepo.save(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepo.findOne({
      where: { token },
    });

    return userToken;
  }
}
