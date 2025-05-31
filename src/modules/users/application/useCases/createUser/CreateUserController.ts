import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user = req.body;

    const useCase = container.resolve(CreateUserUseCase);

    try {
      const result = await useCase.execute(user);
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode).json(err.message);
    }
  }
}
