import { Router } from 'express';
import { UsersController } from '@modules/users/application/useCases/createUser/usersController';
import { UserRepository } from '@modules/users/infra/repositories/UsersRepository';
import { CreateUserUseCase } from '@modules/users/application/useCases/createUser/CreateUserUseCase';
import { ListUsersUseCase } from '@modules/users/application/useCases/listUsers/ListUsersUseCase';
import { UpdatedPasswordUserUseCase } from '@modules/users/application/useCases/updatedPasswordUser/UpdatedPasswordUserUseCase';
import { RemoveUserUseCase } from '@modules/users/application/useCases/removeUser/RemoveUserUseCase';

import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';

export const usersRouter = Router();

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const updatedPasswordUserUseCase = new UpdatedPasswordUserUseCase(
  userRepository,
);
const removeUserUseCase = new RemoveUserUseCase(userRepository);
const usersController = new UsersController(
  createUserUseCase,
  listUsersUseCase,
  updatedPasswordUserUseCase,
  removeUserUseCase,
);

usersRouter.get('/', ensureAuthenticated, async (req, res): Promise<any> => {
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
