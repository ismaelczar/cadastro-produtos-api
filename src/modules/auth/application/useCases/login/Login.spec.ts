import 'reflect-metadata';
import { hash } from 'bcrypt';
import { LoginUseCase } from './LoginUseCase';
import { FakeUserRepository } from '@modules/auth/domain/repositories/fakes/FakeUserRepository';

describe('AuthenticateUser', () => {
  it('should be able to create a new session', async () => {
    process.env.JWT_SECRET = 'minha-chave-secreta';
    const fakeUserRepository = new FakeUserRepository();

    const hashedPassword = await hash('123456', 8);

    await fakeUserRepository.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@example.com',
      password: hashedPassword,
    });

    const loginUseCase = new LoginUseCase(fakeUserRepository);

    const login = await loginUseCase.execute('test@example.com', '123456');

    expect(login).toHaveProperty('token');
  });
});
