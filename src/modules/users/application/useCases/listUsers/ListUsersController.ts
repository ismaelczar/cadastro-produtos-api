import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserUseCase } from './ListUserUseCase';

export class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(ListUserUseCase);

    try {
      const result = await useCase.execute();
      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
