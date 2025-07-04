import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token, newPassword } = req.body;

    const useCase = container.resolve(ResetPasswordUseCase);

    try {
      await useCase.execute(token, newPassword);

      return res.status(204).json();
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no ResetPasswordUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
