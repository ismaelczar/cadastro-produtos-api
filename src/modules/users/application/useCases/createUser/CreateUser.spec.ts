import 'reflect-metadata';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { User } from '@modules/users/domain/entities/User';
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
});
