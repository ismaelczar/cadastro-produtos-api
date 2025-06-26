import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '@modules/users/application/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/users/application/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/users/application/useCases/deleteUser/DeleteUserController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import { UpdatedPasswordUserController } from '@modules/users/application/useCases/updateUserPassword/UpdateUserPasswordController';
import { UpdateUserAvatarController } from '@modules/users/application/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@shared/config/upload';

export const usersRouter = Router();
const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const updateUserPasswordController = new UpdatedPasswordUserController();
const updateUserAvatar = new UpdateUserAvatarController();

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatar.handle.bind(updateUserAvatar),
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  deleteUserController.handle.bind(deleteUserController),
);
