import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteProductUseCase } from './DeleteProductUseCase';

export class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const useCase = container.resolve(DeleteProductUseCase);

    try {
      const result = await useCase.execute(id);

      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
