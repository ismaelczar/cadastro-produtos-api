import 'reflect-metadata';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { FakeUserTokensRepository } from '@modules/users/infra/fakes/FakeUserTokensRepository';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('SendForgotPasswordMail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordUseCase = new ResetPasswordUseCase(
      fakeUserRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to revover the password using the email', async () => {
    let user = await fakeUserRepository.create({
      firstName: 'Teste',
      lastName: 'teste',
      email: 'test@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordUseCase.execute(token, '123123');

    user = await fakeUserRepository.findById(user.id);

    expect(user.password).toBe('123123');
  });
});
