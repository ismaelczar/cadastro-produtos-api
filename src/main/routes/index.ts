import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { productsRouter } from './products.routes';
import { passwordRouter } from './password.routes';

export const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/password', passwordRouter);
