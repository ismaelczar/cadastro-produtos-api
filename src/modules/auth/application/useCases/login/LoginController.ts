import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUseCase } from '@modules/auth/application/useCases/login/LoginUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class LoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const useCase = container.resolve(LoginUseCase);

    try {
      const result = await useCase.execute(email, password);
      return res.status(200).json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no LoginUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
