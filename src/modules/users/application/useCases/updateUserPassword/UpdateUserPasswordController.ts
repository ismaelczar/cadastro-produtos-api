import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';

export class UpdatedPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { emai, password, newPassword } = req.body;
    const useCase = container.resolve(UpdateUserPasswordUseCase);

    try {
      const result = await useCase.execute(emai, password, newPassword);
      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
