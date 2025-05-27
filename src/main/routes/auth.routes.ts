import { Router } from 'express';
import { UserRepository } from '@modules/users/infra/repositories/UsersRepository';
import { LoginUserCase } from '@modules/auth/application/useCases/login/LoginUseCase';
import { LoginController } from '@modules/auth/application/useCases/login/LoginController';

export const authRouter = Router();

const usersRepository = new UserRepository();
const loginUserCase = new LoginUserCase(usersRepository);
const loginUserController = new LoginController(loginUserCase);

authRouter.post('/', async (req, res): Promise<any> => {
  const { email, password } = req.body;

  const { body, statusCode } = await loginUserController.handle(
    email,
    password,
  );

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
