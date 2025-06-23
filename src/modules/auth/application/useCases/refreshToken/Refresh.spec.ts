import 'reflect-metadata';
import { RefreshUseCase } from './RefreshUseCase';
import { sign } from 'jsonwebtoken';

describe('RefreshToken', () => {
  it('should be able to create a new token', async () => {
    process.env.JWT_SECRET = 'supertokensecreto';

    const supertokensecreto = sign({}, 'supertokensecreto', {
      subject: 'test@example.com',
      expiresIn: '15m',
    });

    const refreshUseCase = new RefreshUseCase();
    const result = await refreshUseCase.execute(supertokensecreto);

    expect(result).toHaveProperty('token');
  });
});
