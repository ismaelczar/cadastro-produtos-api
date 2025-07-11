import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/auth/domain/repositories/IUserTokensRepository';
import { AppError } from '@shared/core/errors/AppError';
import { IMailProvider } from '@shared/providers/mail/IMailProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,

    @inject('MailProvider') private readonly mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail inválido', 409, 'validation');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, token);
  }
}
