import 'reflect-metadata';
import { app } from './app';

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
