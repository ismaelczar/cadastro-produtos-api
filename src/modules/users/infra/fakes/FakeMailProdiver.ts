import { IMailProvider } from '@shared/providers/mail/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export class FakeMailProvider implements IMailProvider {
  messages: IMessage[] = [];

  sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });

    return;
  }
}
