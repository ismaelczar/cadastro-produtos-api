import { Router } from 'express';
import { CreateUserController } from '@modules/users/application/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/users/application/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/users/application/useCases/deleteUser/DeleteUserController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import { UpdatedPasswordUserController } from '@modules/users/application/useCases/updateUserPassword/UpdateUserPasswordController';

export const usersRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const updateUserPasswordController = new UpdatedPasswordUserController();

usersRouter.get(
  '/',
  ensureAuthenticated,
  listUserController.handle.bind(listUserController),
);

usersRouter.post('/', createUserController.handle.bind(createUserController));

usersRouter.patch(
  '/',
  ensureAuthenticated,
  updateUserPasswordController.handle.bind(updateUserPasswordController),
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  deleteUserController.handle.bind(deleteUserController),
);
