import 'reflect-metadata';
import { FakeUserRepository } from '@modules/auth/domain/repositories/fakes/FakeUserRepository';
import { ListUserUseCase } from './ListUserUseCase';
import { User } from '@modules/users/domain/entities/user';
import { AppError } from '@shared/core/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let listUserUseCase: ListUserUseCase;
let fakeUser: Omit<User, 'id'>;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listUserUseCase = new ListUserUseCase(fakeUserRepository);
    fakeUser = {
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: '123456',
    };
  });

  it('should be able to return a list users', async () => {
    await fakeUserRepository.create(fakeUser);

    const result = listUserUseCase.execute();

    expect(result).resolves.toBeInstanceOf(Array);
  });

  it('should throw internal error when product list is empty', async () => {
    await expect(listUserUseCase.execute()).rejects.toEqual(
      new AppError('Internal server error', 500, 'infra'),
    );
  });
});
