import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserUseCase } from './ListUserUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListUserUseCase);

    try {
      const result = await useCase.execute();
      return res.json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no ListUserUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
