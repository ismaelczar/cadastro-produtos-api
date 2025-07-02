import { container } from 'tsyringe';

import { IMailProvider } from '@shared/providers/mail/IMailProvider';
import { MailProvider } from '@shared/providers/mail/services/MailProvider';

container.registerSingleton<IMailProvider>('MailProvider', MailProvider);
