import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '@modules/users/application/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/users/application/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/users/application/useCases/deleteUser/DeleteUserController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import { UpdatedPasswordUserController } from '@modules/users/application/useCases/updateUserPassword/UpdateUserPasswordController';
import { UpdateUserAvatarController } from '@modules/users/application/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@shared/config/upload';
import { SendForgotPasswordMailController } from '@modules/users/application/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/users/application/useCases/resetPassword/ResetPasswordController';

export const usersRouter = Router();
const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const updateUserPasswordController = new UpdatedPasswordUserController();
const updateUserAvatar = new UpdateUserAvatarController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

usersRouter.get(
  '/',
  ensureAuthenticated,
  listUserController.handle.bind(listUserController),
);

usersRouter.post('/', createUserController.handle.bind(createUserController));

usersRouter.patch(
  '/password',
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

usersRouter.post(
  '/forgot-password',
  sendForgotPasswordMailController.handle.bind(
    sendForgotPasswordMailController,
  ),
);

usersRouter.post(
  '/reset-password',
  resetPasswordController.handle.bind(resetPasswordController),
);
