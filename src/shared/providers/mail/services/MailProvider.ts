import { IMailProvider } from '../IMailProvider';

export class MailProvider implements IMailProvider {
  async sendMail(to: string, body: string): Promise<void> {}
}
