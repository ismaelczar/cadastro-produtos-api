import { IRedisProvider } from '@shared/providers/redis/IRedisProvider';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshUseCase {
  constructor(
    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  async execute(refreshToken: string): Promise<{ token: string }> {
    const decoded = verify(refreshToken, process.env.JWT_SECRET!) as any;

    const tokenExists = await this.redisProvider.get(decoded.email);

    if (!tokenExists) {
      throw new Error('Refresh token does not exist or has expired');
    }

    const newToken = sign({ id: decoded.sub }, process.env.JWT_SECRET!, {
      subject: decoded.sub,
      expiresIn: '15min',
    });

    return { token: newToken };
  }
}
