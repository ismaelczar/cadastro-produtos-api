import 'reflect-metadata';
import { FakeUserRepository } from '@modules/users/infra/fakes/FakeUserRepository';
import { FakeUserTokensRepository } from '@modules/auth/infra/fakes/FakeUserTokensRepository';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';
import { FakeHashProvider } from '@modules/users/infra/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

let resetPasswordUseCase: ResetPasswordUseCase;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordUseCase = new ResetPasswordUseCase(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
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
