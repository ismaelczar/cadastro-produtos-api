import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshUseCase } from './RefreshUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class RefreshController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    const useCase = container.resolve(RefreshUseCase);

    try {
      const result = await useCase.execute(refreshToken);
      return res.status(200).json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no ListUserUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
