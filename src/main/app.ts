import express from 'express';
import cors from 'cors';

import '@shared/infra/http/providers/typeorm';

import { usersRouter } from './routes/users.routes';
import { authRouter } from './routes/auth.routes';
import { productsRouter } from './routes/products.routes';
import { refreshRouter } from './routes/refresh.routes';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);

//TODO: ADICIONAR REFRESH DENTRO DA ROTA AUTH
app.use('/refresh', refreshRouter);
