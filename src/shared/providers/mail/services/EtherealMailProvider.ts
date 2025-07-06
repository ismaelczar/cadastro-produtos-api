import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider } from '../IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter | undefined = undefined;

  private async initializeClient(): Promise<void> {
    if (this.client) {
      return;
    }

    const account = await nodemailer.createTestAccount();

    this.client = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    await this.initializeClient();

    const message = await this.client!.sendMail({
      from: 'Equipe Cadastro de Produtos <noreply@cadastro-produtos.com>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
