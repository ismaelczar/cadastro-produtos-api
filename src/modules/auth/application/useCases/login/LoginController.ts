import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUseCase } from '@modules/auth/application/useCases/login/LoginUseCase';

export class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const useCase = container.resolve(LoginUseCase);
    try {
      const result = await useCase.execute(email, password);
      return res.json(result);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  }
}
