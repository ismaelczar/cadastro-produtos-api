import 'reflect-metadata';
import { hash } from 'bcrypt';
import { FakeUserRepository } from '@modules/auth/domain/repositories/fakes/FakeUserRepository';
import { UpdatedPasswordUserUseCase } from './UpdatedPasswordUserUseCase';
import { User } from '@modules/users/domain/entities/user';
import { AppError } from '@shared/core/errors/AppError';

describe('UpdatePasswordUser', () => {
  let fakeUserRepository: FakeUserRepository;
  let updatedPasswordUserUseCase: UpdatedPasswordUserUseCase;
  let fakeUser: User;

  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    updatedPasswordUserUseCase = new UpdatedPasswordUserUseCase(
      fakeUserRepository,
    );

    const hashedPassword = await hash('123456', 8);

    fakeUser = {
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: hashedPassword,
    };

    await fakeUserRepository.create(fakeUser);
  });

  it('should be able to updated password user', async () => {
    const result = await updatedPasswordUserUseCase.execute(
      'test@example.com',
      '123456',
      '12345678',
    );

    expect(result).toHaveProperty('email');
    expect(result.password).toBeUndefined();
  });

  it('should throw if user does not exist', async () => {
    await expect(
      updatedPasswordUserUseCase.execute(
        'nonexistent@example.com',
        '123456',
        'newpassword',
      ),
    ).rejects.toEqual(new AppError('Combinação inválida', 409, 'validation'));
  });

  it('should throw if password does not match', async () => {
    const hashedPassword = await hash('123456', 8);

    const user = {
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: hashedPassword,
    };

    await fakeUserRepository.create(user);

    await expect(
      updatedPasswordUserUseCase.execute(
        'test@example.com',
        'wrongpassword',
        'newpassword',
      ),
    ).rejects.toEqual(new AppError('Combinação inválida', 409, 'validation'));
  });
});
