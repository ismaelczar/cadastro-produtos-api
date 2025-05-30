import { Router } from 'express';
import { RefreshTokenController } from '@modules/auth/application/useCases/refreshToken/RefreshController';
import { ensureRefreshToken } from 'main/http/middlewares/ensureRefreshToken';
import { RefreshTokenUseCase } from '@modules/auth/application/useCases/refreshToken/RefreshUseCase';

const refreshTokenUseCase = new RefreshTokenUseCase();
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

export const refreshRouter = Router();

refreshRouter.patch('/', ensureRefreshToken, async (req, res): Promise<any> => {
  const { refreshToken } = req.body;

  const { statusCode, body } = await refreshTokenController.handle(
    refreshToken,
  );

  if (statusCode === 200 && typeof body !== 'string') {
    res.cookie('refreshToken', body.newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    return res.status(statusCode).json({
      data: {
        newAccessToken: body.newAccessToken,
      },
    });
  }

  return res.status(statusCode).json({
    error: body,
  });
});
