import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class UpdatedPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password, newPassword } = req.body;
    const useCase = container.resolve(UpdateUserPasswordUseCase);

    try {
      const result = await useCase.execute(email, password, newPassword);
      return res.json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no UpdateUserPasswordUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
