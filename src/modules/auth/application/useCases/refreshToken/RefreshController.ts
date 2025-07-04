import { Request, Response } from 'express';
import { container } from 'tsyringe';

//TODO: Refatorar esse controller.
import { RefreshUseCase } from './RefreshUseCase';

export class RefreshController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    const useCase = container.resolve(RefreshUseCase);
    const result = await useCase.execute(refreshToken);

    return res.json(result);
  }
}
