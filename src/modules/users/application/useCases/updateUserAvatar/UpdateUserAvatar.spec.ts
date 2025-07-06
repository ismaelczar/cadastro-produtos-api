import 'reflect-metadata';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';
import { FakeStorageProvider } from '@modules/users/infra/fakes/FakeStorageProvider';
import { AppError } from '@shared/core/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let fakeStorageProvider: FakeStorageProvider;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the user avatar', async () => {
    await fakeUserRepository.create({
      id: '1',
      email: 'test@example.com',
      firstName: 'test',
      lastName: 'teste',
      password: '123456',
      avatar: 'avatar',
    });

    const result = await updateUserAvatarUseCase.execute('1', 'new-avatar');

    expect(result.avatar).toBe('new-avatar');
  });

  it('should not be able to update avatar for a non-existing user', async () => {
    await fakeUserRepository.create({
      id: '1',
      email: 'test@example.com',
      firstName: 'test',
      lastName: 'teste',
      password: '123456',
      avatar: 'avatar',
    });

    await expect(
      updateUserAvatarUseCase.execute('2', 'new-avatar'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
