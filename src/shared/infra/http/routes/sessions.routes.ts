import { Router } from 'express';
import { UserRepository } from '../../../../modules/users/repositories/usersRepository';
import { AuthenticateUserService } from '../../../../modules/users/services/SessionsService';
import { SessionsController } from '../controllers/sessionsController';

export const sessionsRouter = Router();

const usersRepository = new UserRepository();
const sessionsService = new AuthenticateUserService(usersRepository);
const sessionsController = new SessionsController(sessionsService);

sessionsRouter.post('/', async (req, res): Promise<any> => {
  const { email, password } = req.body;

  const { body, statusCode } = await sessionsController.handle(email, password);

  if (statusCode === 200 && typeof body !== 'string') {
    const { refreshToken, user } = body;

    // Envia refreshToken como cookie HTTP-only
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // ative HTTPS no deploy
      sameSite: 'strict',
      path: '/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ data: user });
  }

  return res.status(statusCode).json({
    data: body,
  });
});
