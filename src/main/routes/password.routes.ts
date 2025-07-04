import { Router } from 'express';
import { SendForgotPasswordMailController } from '@modules/auth/application/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/auth/application/useCases/resetPassword/ResetPasswordController';

export const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  sendForgotPasswordMailController.handle.bind(
    sendForgotPasswordMailController,
  ),
);

passwordRouter.post(
  '/reset',
  resetPasswordController.handle.bind(resetPasswordController),
);
