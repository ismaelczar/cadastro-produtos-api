import { Router } from 'express';
import { UsersController } from '../controllers/users/usersController';
import { UserRepository } from '../repositories/users/usersRepository';

export const usersRouter = Router();

usersRouter.get('/', async (req, res): Promise<any> => {
  const userRepository = new UserRepository();
  const usersController = new UsersController(userRepository);

  const { body, statusCode } = await usersController.list();

  return res.status(statusCode).json({
    status: 'sucess',
    data: body,
  });
});

usersRouter.post('/', (req, res) => {
  return res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});
