import { Request, Response, NextFunction } from 'express';

export function ensureRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //   const { refreshToken } = req.body.token || req.body.refreshToken;
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token is missing' });
    return;
  }

  next();
}
