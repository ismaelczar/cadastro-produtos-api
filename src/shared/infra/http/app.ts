import express from 'express';
import cors from 'cors';

import '@shared/infra/typeorm';

import { usersRouter } from './routes/users.routes';
import { sessionsRouter } from './routes/sessions.routes';

export const app = express();

app.use(express.json());
app.use(cors());

// app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sessions', sessionsRouter);
