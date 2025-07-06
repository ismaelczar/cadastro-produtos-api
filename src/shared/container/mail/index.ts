import { container } from 'tsyringe';

import { IMailProvider } from '@shared/providers/mail/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/mail/services/EtherealMailProvider';

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);
