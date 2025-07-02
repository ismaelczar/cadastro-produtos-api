import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { AppError } from '@shared/core/errors/AppError';
import { IMailProvider } from '@shared/providers/mail/IMailProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,

    @inject('MailProvider') private readonly mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail inválido', 409, 'validation');
    }

    await this.mailProvider.sendMail(email, 'descrição do e-mail');
  }
}
