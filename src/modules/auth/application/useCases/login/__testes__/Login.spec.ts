import { LoginUseCase } from '../LoginUseCase';
import { FakeUserRepository } from '../fakes/FakeUserRepository';

describe('Login', async () => {
  it('should be able to create a new session', () => {});

  const fakeUserRepository = new FakeUserRepository();
  const loginUseCase = new LoginUseCase(fakeUserRepository);

  const login = await loginUseCase.execute('email@gmail.com', '123');

  expect(login).toHaveProperty('token');
  expect(login).toHaveProperty('refreshToken');
});
