import { AppError } from '@shared/core/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Invalid token', 401, 'validation');
  }

  const [_, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token', 401, 'validation');
  }
}
