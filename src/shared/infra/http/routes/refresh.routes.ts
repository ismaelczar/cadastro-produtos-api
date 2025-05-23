import { Router } from 'express';
import { RefreshTokenController } from '../controllers/refreshTokenController';
import { ensureRefreshToken } from '@modules/users/middlewares/ensureRefreshToken';
import { RefreshTokenService } from '@modules/users/services/RefreshTokenService';

const refreshTokenService = new RefreshTokenService();
const refreshTokenController = new RefreshTokenController(refreshTokenService);

export const refreshRouter = Router();

refreshRouter.patch('/', ensureRefreshToken, async (req, res): Promise<any> => {
  const { refreshToken } = req.body.token;

  const {} = refreshTokenController.handle(refreshToken);

  return res.status(200).json({
    data: 'body',
  });
});
