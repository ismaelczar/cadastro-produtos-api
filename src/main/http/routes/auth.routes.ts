import { Router } from 'express';
import { LoginController } from '@modules/auth/application/useCases/login/LoginController';
import { RefreshController } from '@modules/auth/application/useCases/refreshToken/RefreshController';
import { body } from 'express-validator';
import { validate } from 'main/http/middlewares/handleValidationErrors';
import { ValidationErrors } from '@shared/core/errors/messages';

export const authRouter = Router();
const loginController = new LoginController();
const refreshController = new RefreshController();

authRouter.post(
  '/login',
  [
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
  loginController.handle.bind(loginController),
);
authRouter.post(
  '/refresh',
  [
    body('refreshToken')
      .notEmpty()
      .withMessage(ValidationErrors.REFRESH_REQUIRED)
      .isUUID()
      .withMessage(ValidationErrors.REFRESH_INVALID),

    validate,
  ],
  refreshController.handle.bind(refreshController),
);
