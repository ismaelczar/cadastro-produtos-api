import { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { UserRepository } from '../repositories/users/usersRepository';
import { CreateUserService } from '../services/createUserService';
import { ListUsersService } from '../services/listUsersService';
import { UpdatedPasswordUserService } from '../services/updatedPasswordUserService';
import { RemoveUserService } from '../services/removeUserService';

export const usersRouter = Router();

const userRepository = new UserRepository();
const createUserService = new CreateUserService(userRepository);
const listUsersService = new ListUsersService(userRepository);
const updatedPasswordUserService = new UpdatedPasswordUserService(
  userRepository,
);
const removeUserService = new RemoveUserService(userRepository);
const usersController = new UsersController(
  createUserService,
  listUsersService,
  updatedPasswordUserService,
  removeUserService,
);

usersRouter.get('/', async (req, res): Promise<any> => {
  const { body, statusCode } = await usersController.getUsers();

  return res.status(statusCode).json({
    data: body,
  });
});

usersRouter.post('/', async (req, res): Promise<any> => {
  const user = req.body;
  const { body, statusCode } = await usersController.createUser(user);

  return res.status(statusCode).json({
    data: body,
  });
});

usersRouter.patch('/:id', async (req, res): Promise<any> => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  const { body, statusCode } = await usersController.updatePassword(
    id,
    password,
    newPassword,
  );
  return res.status(statusCode).json({
    data: body,
  });
});

usersRouter.delete('/:id', async (req, res): Promise<any> => {
  const { id } = req.params;

  const { body, statusCode } = await usersController.removeUser(id);

  return res.status(statusCode).json({
    data: body,
  });
});
