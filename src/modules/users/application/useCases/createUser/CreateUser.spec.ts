import 'reflect-metadata';
import { FakeUserRepository } from '@modules/auth/domain/repositories/fakes/FakeUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { User } from '@modules/users/domain/entities/user';
import { AppError } from '@shared/core/errors/AppError';
import { FakeHashProvider } from '@modules/users/infra/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserUseCase: CreateUserUseCase;
let fakeUser: Omit<User, 'id'>;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserUseCase = new CreateUserUseCase(
      fakeUserRepository,
      fakeHashProvider,
    );
    fakeUser = {
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: '123456',
    };
  });

  it('should be able to create a new user', async () => {
    const result = await createUserUseCase.execute(fakeUser);

    expect(result).toHaveProperty('email');
  });

  it('should be able to return an email already registered', async () => {
    await fakeUserRepository.create({
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(createUserUseCase.execute(fakeUser)).rejects.toEqual(
      new AppError('E-email já cadastrado', 409, 'validation'),
    );
  });
});
