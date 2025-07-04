import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteProductUseCase } from './DeleteProductUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const useCase = container.resolve(DeleteProductUseCase);

    try {
      const result = await useCase.execute(id);

      return res.json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no DeleteProductUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
