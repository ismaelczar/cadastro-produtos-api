import 'reflect-metadata';
import { hash } from 'bcrypt';
import { LoginUseCase } from './LoginUseCase';
import { FakeUserRepository } from '@modules/auth/domain/repositories/fakes/FakeUserRepository';
import { AppError } from '@shared/core/errors/AppError';

describe('AuthenticateUser', () => {
  let fakeUserRepository: FakeUserRepository;
  let loginUseCase: LoginUseCase;
  let hashedPassword: string;

  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    loginUseCase = new LoginUseCase(fakeUserRepository);
    hashedPassword = await hash('123456', 8);
  });

  it('should be able to create a new session', async () => {
    process.env.JWT_SECRET = 'minha-chave-secreta';

    await fakeUserRepository.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@example.com',
      password: hashedPassword,
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

    try {
      await loginUseCase.execute('invalid e-mail', '123456');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('E-mail inválido');
      expect(error.statusCode).toBe(409);
      expect(error.type).toBe('validation');
    }
  });

  it('should throw if ID is not a valid password', async () => {
    await fakeUserRepository.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@example.com',
      password: hashedPassword,
    });

    try {
      await loginUseCase.execute('test@example.com', 'invalid-password');
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Senha inválida');
      expect(error.statusCode).toBe(409);
      expect(error.type).toBe('validation');
    }
  });
});
