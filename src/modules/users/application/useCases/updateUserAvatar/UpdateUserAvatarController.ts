import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(UpdateUserAvatarUseCase);

    const data = req.body;

    try {
      const result = useCase.execute('id', 'path');
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(error.message);
    }
  }
}
