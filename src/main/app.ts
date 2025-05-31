import express from 'express';
import cors from 'cors';

import '@shared/infra/http/providers/typeorm';
import { handleError } from './http/middlewares/handleError';

import { usersRouter } from './routes/users.routes';
import { authRouter } from './routes/auth.routes';
import { productsRouter } from './routes/products.routes';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use(handleError);
