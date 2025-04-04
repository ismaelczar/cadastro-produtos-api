import { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { UserRepository } from '../repositories/users/usersRepository';

export const usersRouter = Router();

const userRepository = new UserRepository();
const usersController = new UsersController(userRepository);

usersRouter.get('/', async (req, res): Promise<any> => {
  const { body, statusCode } = await usersController.getUsers();

  return res.status(statusCode).json({
    // status: 'sucess',
    data: body,
  });
});

usersRouter.post('/', async (req, res): Promise<any> => {
  const user = req.body;
  const { body, statusCode } = await usersController.createUser(user);

  return res.status(statusCode).json({
    // status: '',
    data: body,
  });
});
