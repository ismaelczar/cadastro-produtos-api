import 'reflect-metadata';
import { FakeUserRepository } from '@modules/auth/domain/repositories/fakes/FakeUserRepository';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';
import { FakeMailProvider } from '@modules/users/infra/fakes/FakeMailProdiver';
import { AppError } from '@shared/core/errors/AppError';

describe('SendForgotPasswordMail', () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeMailProvider: FakeMailProvider;
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      fakeUserRepository,
      fakeMailProvider,
    );
  });

  it('should be able to revover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover password of non-existing user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('nonexistent@example.com'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
