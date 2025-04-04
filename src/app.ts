import express from 'express';
import cors from 'cors';
// import { productsRoutes } from './routes/products.routes';
import { usersRouter } from './routes/users.routes';

import './database';

export const app = express();

app.use(express.json());
app.use(cors());

// app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRouter);
