import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';
import { CreateProductDTO } from '@modules/products/domain/dtos/CreateProductDTO';
import { AppError } from '@shared/core/errors/AppError';

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const files = req.files as Express.Multer.File[];
      const data: CreateProductDTO = req.body;

      const useCase = container.resolve(CreateProductUseCase);
      const result = await useCase.execute(data, files);

      return res.status(201).json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no CreateProductUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
