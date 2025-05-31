import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatedPasswordUserUseCase } from './UpdatedPasswordUserUseCase';

export class UpdatedPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { emai, password, newPassword } = req.body;
    const useCase = container.resolve(UpdatedPasswordUserUseCase);

    try {
      const result = await useCase.execute(emai, password, newPassword);
      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
