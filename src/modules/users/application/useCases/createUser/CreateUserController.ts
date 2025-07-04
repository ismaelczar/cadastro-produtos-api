import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user = req.body;

    const useCase = container.resolve(CreateUserUseCase);

    try {
      const result = await useCase.execute(user);
      return res.json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no CreateUserUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
