import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductUseCase';
import { UpdateProductDTO } from '@modules/products/domain/dtos/UpdateProductDTO';
import { AppError } from '@shared/core/errors/AppError';

export class UpdatedProductController {
  async hande(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const data: UpdateProductDTO = req.body;

    const useCase = container.resolve(UpdateProductUseCase);

    try {
      const result = await useCase.execute(data, id);

      return res.json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no UpdateProductUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
