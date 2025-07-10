import { AppError } from '@shared/core/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  console.log({ chegou: req.user });
  if (!req.user || req.user.role !== true) {
    throw new AppError(
      'Access forbidden. You do not have administrator privileges.',
      403,
      'auth',
    );
  }

  return next();
}
