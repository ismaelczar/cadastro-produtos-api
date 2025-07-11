import { Router } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { CreateUserController } from '@modules/users/application/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/users/application/useCases/listUsers/ListUsersController';
import { DeleteUserController } from '@modules/users/application/useCases/deleteUser/DeleteUserController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import { UpdatedPasswordUserController } from '@modules/users/application/useCases/updateUserPassword/UpdateUserPasswordController';
import { UpdateUserAvatarController } from '@modules/users/application/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@shared/config/upload';
import { ensureAdmin } from 'main/http/middlewares/ensureAdmin';
import { validate } from 'main/http/middlewares/handleValidationErrors';
import { ValidationErrors } from '@shared/core/errors/messages';

export const usersRouter = Router();
const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const updateUserPasswordController = new UpdatedPasswordUserController();
const updateUserAvatar = new UpdateUserAvatarController();

// TODO: Analisar forma de usar a propiedade role na criação do usuário.
usersRouter.post(
  '/',
  [
    body('firstName')
      .notEmpty()
      .withMessage(ValidationErrors.FIRSTNAME_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(ValidationErrors.FIRSTNAME_INVALID),
    body('lastName')
      .notEmpty()
      .withMessage(ValidationErrors.EMAIL_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(ValidationErrors.EMAIL_INVALID),
    body('email')
      .notEmpty()
      .withMessage(ValidationErrors.EMAIL_REQUIRED)
      .isEmail()
      .withMessage(ValidationErrors.EMAIL_INVALID),
    body('password')
      .notEmpty()
      .withMessage(ValidationErrors.PASSWORD_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(ValidationErrors.PASSWORD_TOO_SHORT),

    validate,
  ],
  createUserController.handle.bind(createUserController),
);

usersRouter.patch(
  '/me/password',
  [
    body('email')
      .notEmpty()
      .withMessage(ValidationErrors.EMAIL_REQUIRED)
      .isEmail()
      .withMessage(ValidationErrors.EMAIL_INVALID),
    body('password').notEmpty().withMessage(ValidationErrors.PASSWORD_REQUIRED),
    body('newPassword')
      .notEmpty()
      .withMessage(ValidationErrors.PASSWORD_REQUIRED)
      .isLength({ min: 3 })
      .withMessage(ValidationErrors.PASSWORD_TOO_SHORT),

    validate,
  ],
  ensureAuthenticated,
  updateUserPasswordController.handle.bind(updateUserPasswordController),
);

usersRouter.patch(
  '/me/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatar.handle.bind(updateUserAvatar),
);

usersRouter.delete(
  '/me',
  ensureAuthenticated,
  deleteUserController.handle.bind(deleteUserController),
);

//Administradores
usersRouter.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listUserController.handle.bind(listUserController),
);
