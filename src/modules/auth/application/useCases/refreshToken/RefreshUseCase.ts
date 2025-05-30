import { sign, verify } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class RefreshUseCase {
  async execute(refreshToken: string): Promise<{ token: string }> {
    const decoded = verify(refreshToken, process.env.JWT_SECRET!) as any;

    //TODO: VERIFICA SE O TOKEN CONSTA NO DB 'REDIS'?

    const newToken = sign({ id: decoded.sub }, process.env.JWT_SECRET!, {
      subject: decoded.sub,
      expiresIn: '15min',
    });

    return { token: newToken };
  }
}
