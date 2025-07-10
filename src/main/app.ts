import express from 'express';
import cors from 'cors';

import '@shared/providers/typeorm/';
import { handleError } from './http/middlewares/handleError';
import { routes } from './routes';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/', routes);
app.use(handleError);
