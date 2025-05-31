import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/core/errors/AppError';

export function handleError(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const errorType = isAppError ? err.type : 'unknown';

  res.status(statusCode).json({
    status: 'error',
    message: isAppError ? err.message : 'Internal server error',
    type: isAppError ? err.type : 'unknown',
  });
}
