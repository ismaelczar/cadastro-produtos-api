import express from 'express';
import cors from 'cors';
// import { productsRoutes } from './routes/products.routes';
import { usersRouter } from './routes/users.routes';

import '../typeorm';
import { sessionsRouter } from './routes/sessions.routes';

export const app = express();

app.use(express.json());
app.use(cors());

// app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sessions', sessionsRouter);
