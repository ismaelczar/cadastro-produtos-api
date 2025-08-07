import 'reflect-metadata';
import 'dotenv/config';

import app from './app';
import { handleError } from './http/middlewares/handleError';
import { routes } from './http/routes';
import { registerSharedProviders } from '../shared/container';

export async function bootstrap() {
  app.use(registerSharedProviders);
  app.use(routes);
  app.use(handleError);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
}
