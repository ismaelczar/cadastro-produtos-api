import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductsUseCase } from './ListProductsUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class ListProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListProductsUseCase);

    try {
      const result = await useCase.execute();
      return res.json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no ListProductsUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
