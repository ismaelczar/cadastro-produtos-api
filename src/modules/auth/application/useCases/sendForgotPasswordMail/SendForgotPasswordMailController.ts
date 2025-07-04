import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const useCase = container.resolve(SendForgotPasswordMailUseCase);

    try {
      await useCase.execute(email);

      return res.status(204).json();
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
