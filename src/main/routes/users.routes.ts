import { Router } from 'express';
import { CreateUserController } from '@modules/users/application/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/users/application/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/users/application/useCases/deleteUser/DeleteUserController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import { UpdatedPasswordUserController } from '@modules/users/application/useCases/updatedPasswordUser/UpdatedPasswordUserController';

export const usersRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const updatedaPasswordController = new UpdatedPasswordUserController();

usersRouter.get(
  '/',
  ensureAuthenticated,
  listUserController.handle.bind(listUserController),
); //TODO: Rota apenas para administradores

usersRouter.post('/', createUserController.handle.bind(createUserController));

usersRouter.patch(
  '/',
  ensureAuthenticated,
  updatedaPasswordController.handle.bind(updatedaPasswordController),
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  deleteUserController.handle.bind(DeleteUserController),
);
