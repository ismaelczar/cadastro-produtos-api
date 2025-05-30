import 'reflect-metadata';
import 'dotenv/config';
import '../shared/container';

import { app } from './app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
