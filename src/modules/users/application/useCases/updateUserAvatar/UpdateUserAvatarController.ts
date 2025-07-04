import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';
import { AppError } from '@shared/core/errors/AppError';

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const useCase = container.resolve(UpdateUserAvatarUseCase);

      const userId = req.user.id;
      const filename = req.file.filename;

      const result = useCase.execute(userId, filename);

      return res.status(200).json(result);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Erro inesperado no UpdateUserAvatarUseCase:', err);
      return res
        .status(500)
        .json({ message: 'Internal Server Error. Please try again later.' });
    }
  }
}
