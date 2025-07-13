import 'reflect-metadata';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';
import { User } from '@modules/users/domain/entities/User';
import { AppError } from '@shared/core/errors/AppError';
import { FakeHashProvider } from '@modules/users/infra/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let updatedPasswordUserUseCase: UpdateUserPasswordUseCase;
let fakeHashProvider: FakeHashProvider;
let fakeUser: User;

describe('UpdatePasswordUser', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updatedPasswordUserUseCase = new UpdateUserPasswordUseCase(
      fakeUserRepository,
      fakeHashProvider,
    );

    const hashedPassword = await fakeHashProvider.generateHash('123456');

    fakeUser = {
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: hashedPassword,
    };

    await fakeUserRepository.create(fakeUser);
  });

  it('should be able to update user password', async () => {
    const result = await updatedPasswordUserUseCase.execute(
      'test@example.com',
      '123456',
      'test123',
    );

    expect(result).toHaveProperty('email');
    expect(result.password).not.toBe('123456');
  });

  it('should throw if user does not exist', async () => {
    await expect(
      updatedPasswordUserUseCase.execute(
        'nonexistent@example.com',
        '123456',
        'newpassword',
      ),
    ).rejects.toEqual(
      new AppError('Usuário não encontrado', 404, 'validation'),
    );
  });

  it('should throw if password does not match', async () => {
    await expect(
      updatedPasswordUserUseCase.execute(
        'test@example.com',
        'wrongpassword',
        'newpassword',
      ),
    ).rejects.toEqual(new AppError('Senha inválida', 409, 'validation'));
  });
});
