import 'reflect-metadata';
import 'dotenv/config';
import '../shared/container';
import '../shared/providers/typeorm';

import app from './app';
import { handleError } from './http/middlewares/handleError';
import { routes } from './http/routes';

export async function bootstrap() {
  app.use(routes);
  app.use(handleError);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
}
