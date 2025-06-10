import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';
import { CreateProductDTO } from '@modules/products/domain/dtos/CreateProductDTO';

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data: CreateProductDTO = req.body;

    const useCase = container.resolve(CreateProductUseCase);

    try {
      const result = await useCase.execute(data);

      return res.json(result);
    } catch (err) {
      return res.status(err.statusCodr).json(err.message);
    }
  }
}
