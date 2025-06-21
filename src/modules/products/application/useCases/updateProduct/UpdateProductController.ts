import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductUseCase';
import { UpdateProductDTO } from '@modules/products/domain/dtos/UpdateProductDTO';

export class UpdatedProductController {
  async hande(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const data: UpdateProductDTO = req.body;

    const useCase = container.resolve(UpdateProductUseCase);

    try {
      const result = await useCase.execute(data, id);

      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
