import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token, newPassword } = req.body;

    const useCase = container.resolve(ResetPasswordUseCase);

    try {
      const result = await useCase.execute(token, newPassword);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
