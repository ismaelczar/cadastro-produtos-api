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

export const usersRouter = Router();
const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserController = new DeleteUserController();
const updateUserPasswordController = new UpdatedPasswordUserController();
const updateUserAvatar = new UpdateUserAvatarController();

usersRouter.post(
  '/',
  [
    body('firstName')
      .notEmpty()
      .withMessage('O Nome é obrigatório')
      .isLength({ min: 3 })
      .withMessage('Deve ter no minimo 3 caracters'),
    body('lastName')
      .notEmpty()
      .withMessage('O Sobrenome é obrigatório')
      .isLength({ min: 3 })
      .withMessage('Deve ter no minimo 3 caracters'),
    body('email')
      .notEmpty()
      .withMessage('O Email é obrigatório')
      .isEmail()
      .withMessage('Deve ser fornecido um e-mail válido.'),
    body('password').notEmpty().withMessage('A Senha é obrigatório'),

    validate,
  ],
  createUserController.handle.bind(createUserController),
);

usersRouter.patch(
  '/me/password',
  [
    body('email')
      .notEmpty()
      .withMessage('O Email é obrigatório')
      .isEmail()
      .withMessage('Deve ser fornecido um e-mail válido.'),
    body('password').notEmpty().withMessage('A senha é obrigatória.'),
    body('newPassword').notEmpty().withMessage('A nova senha é obrigatória.'),

    validate,
  ],
  ensureAuthenticated,
  updateUserPasswordController.handle.bind(updateUserPasswordController),
);

usersRouter.patch(
  '/me/avatar',
  [body('avatar').notEmpty().withMessage('Avatar é obrigatório.'), validate],
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
