import { Router } from 'express';
import { LoginController } from '@modules/auth/application/useCases/login/LoginController';
import { RefreshController } from '@modules/auth/application/useCases/refreshToken/RefreshController';

export const authRouter = Router();
const loginController = new LoginController();
const refreshController = new RefreshController();

authRouter.post('/login', loginController.handle.bind(loginController));
authRouter.post('/refresh', refreshController.handle.bind(refreshController));
