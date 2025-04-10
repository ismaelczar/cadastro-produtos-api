import { Router } from 'express';
import { UserRepository } from '../../modules/users/repositories/usersRepository';
import { AuthenticateUserService } from '../../modules/users/services/sessionsService';
import { SessionsController } from '../controllers/sessionsController';

export const sessionsRouter = Router();

const usersRepository = new UserRepository();
const sessionsService = new AuthenticateUserService(usersRepository);
const sessionsController = new SessionsController(sessionsService);

sessionsRouter.post('/', async (req, res): Promise<any> => {
  const { email, password } = req.body;

  const { body, statusCode } = await sessionsController.login(email, password);

  return res.status(statusCode).json({
    data: body,
  });
});
