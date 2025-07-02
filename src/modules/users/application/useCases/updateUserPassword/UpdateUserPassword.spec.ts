import 'reflect-metadata';
import { hash } from 'bcrypt';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';
import { User } from '@modules/users/domain/entities/User';
import { AppError } from '@shared/core/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let updatedPasswordUserUseCase: UpdateUserPasswordUseCase;
let fakeUser: User;

describe('UpdatePasswordUser', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepository();
    updatedPasswordUserUseCase = new UpdateUserPasswordUseCase(
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
