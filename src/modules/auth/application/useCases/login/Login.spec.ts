import 'reflect-metadata';
import { hash } from 'bcrypt';
import { LoginUseCase } from './LoginUseCase';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { AppError } from '@shared/core/errors/AppError';
import { FakeHashProvider } from '@modules/users/infra/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let loginUseCase: LoginUseCase;
let hashedPassword: string;

describe('AuthenticateUser', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    loginUseCase = new LoginUseCase(fakeUserRepository, fakeHashProvider);
    hashedPassword = await hash('123456', 8);
  });

  it('should be able to create a new session', async () => {
    process.env.JWT_SECRET = 'minha-chave-secreta';

    await fakeUserRepository.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@example.com',
      password: '123456',
    });

    const result = await loginUseCase.execute('test@example.com', '123456');

    expect(result).toHaveProperty('token');
  });

  it('should throw if ID is not a valid e-mail', async () => {
    await fakeUserRepository.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@example.com',
      password: hashedPassword,
    });

    await expect(
      loginUseCase.execute('invalid e-mail', '123456'),
    ).rejects.toEqual(new AppError('E-mail inválido', 409, 'validation'));
  });

  it('should throw if ID is not a valid password', async () => {
    await fakeUserRepository.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@example.com',
      password: hashedPassword,
    });

    await expect(
      loginUseCase.execute('test@example.com', 'invalid-password'),
    ).rejects.toEqual(new AppError('Senha inválida', 409, 'validation'));
  });
});
