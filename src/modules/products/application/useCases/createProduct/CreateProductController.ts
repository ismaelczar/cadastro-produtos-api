import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';
import { CreateProductDTO } from '@modules/products/domain/dtos/CreateProductDTO';

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const files = req.files as Express.Multer.File[];
      const data: CreateProductDTO = req.body;

      const useCase = container.resolve(CreateProductUseCase);
      const result = await useCase.execute(data, files);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(error.message);
    }
  }
}
