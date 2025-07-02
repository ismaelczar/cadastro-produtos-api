import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const useCase = container.resolve(SendForgotPasswordMailUseCase);

    try {
      const result = await useCase.execute(email);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
