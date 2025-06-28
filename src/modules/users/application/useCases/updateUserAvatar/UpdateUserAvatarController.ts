import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const useCase = container.resolve(UpdateUserAvatarUseCase);

    const userId = req.user.id;
    const filename = req.file.filename;

    try {
      const result = useCase.execute(userId, filename);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'message' });
    }
  }
}
