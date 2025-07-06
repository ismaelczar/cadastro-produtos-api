import 'reflect-metadata';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { User } from '@modules/users/domain/entities/User';
import { AppError } from '@shared/core/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let deleteUserUseCase: DeleteUserUseCase;
let fakeUser: User;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(fakeUserRepository);
    fakeUser = {
      id: '1',
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: '123456',
    };
  });

  it('should be able to remove a user', async () => {
    const fakeUserData = await fakeUserRepository.create(fakeUser);

    await expect(
      deleteUserUseCase.execute(fakeUserData.id),
    ).resolves.toBeUndefined();
  });

  it('should throw if ID is not a valid one', async () => {
    await expect(
      deleteUserUseCase.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
