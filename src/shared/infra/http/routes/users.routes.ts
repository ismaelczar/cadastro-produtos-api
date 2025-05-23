import { Router } from 'express';
import { UsersController } from '@shared/infra/http/controllers/usersController';
import { UserRepository } from '@modules/users/repositories/usersRepository';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { UpdatedPasswordUserService } from '@modules/users/services/UpdatedPasswordUserService';
import { RemoveUserService } from '@modules/users/services/RemoveUserService';

import { ensureAuthenticated } from '@modules/users/middlewares/ensureAuthenticated';

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

usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  async (req, res): Promise<any> => {
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
  },
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (req, res): Promise<any> => {
    const { id } = req.params;

    const { body, statusCode } = await usersController.removeUser(id);

    return res.status(statusCode).json({
      data: body,
    });
  },
);
