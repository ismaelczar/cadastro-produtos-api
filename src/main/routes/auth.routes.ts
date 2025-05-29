import { Router } from 'express';
import { LoginController } from '@modules/auth/application/useCases/login/LoginController';

export const authRouter = Router();
const loginController = new LoginController();

authRouter.post('/login', loginController.handle.bind(loginController));
