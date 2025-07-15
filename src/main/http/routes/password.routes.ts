import { Router } from 'express';
import { SendForgotPasswordMailController } from '@modules/auth/application/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/auth/application/useCases/resetPassword/ResetPasswordController';
import { body } from 'express-validator';
import { validate } from 'main/http/middlewares/handleValidationErrors';
import { ValidationErrors } from '@shared/core/errors/messages';

export const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  [
    body('email')
      .notEmpty()
      .withMessage(ValidationErrors.EMAIL_REQUIRED)
      .isEmail()
      .withMessage(ValidationErrors.EMAIL_INVALID),

    validate,
  ],
  sendForgotPasswordMailController.handle.bind(
    sendForgotPasswordMailController,
  ),
);

passwordRouter.post(
  '/reset',
  [
    body('token')
      .notEmpty()
      .withMessage(ValidationErrors.TOKEN_REQUIRED)
      .isUUID()
      .withMessage(ValidationErrors.TOKEN_INVALID),
    body('newPassword')
      .notEmpty()
      .withMessage(ValidationErrors.PASSWORD_REQUIRED),

    validate,
  ],
  resetPasswordController.handle.bind(resetPasswordController),
);
