import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductsUseCase } from './ListProductsUseCase';

export class ListProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListProductsUseCase);

    try {
      const result = await useCase.execute();
      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
