import express from 'express';
import cors from 'cors';

import '@shared/providers/typeorm/';
import { handleError } from './http/middlewares/handleError';

import { usersRouter } from './routes/users.routes';
import { authRouter } from './routes/auth.routes';
import { productsRouter } from './routes/products.routes';
import { passwordRouter } from './routes/password.routes';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/pasword', passwordRouter);

app.use(handleError);
