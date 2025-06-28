import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const files = req.files as Express.Multer.File[];

      const {
        name,
        price,
        description,
        long_description,
        rating,
        reviewCount,
        features,
        isAvailable,
        freeShipping,
        shippingEstimate,
      } = req.body;

      const image_urls: string[] = files?.map((file) => {
        return `http://localhost:3333/tmp/${file.filename}`;
      });

      const useCase = container.resolve(CreateProductUseCase);

      const result = await useCase.execute({
        name,
        price: Number(price),
        description,
        long_description: JSON.parse(long_description),
        image_urls,
        rating: rating ? Number(rating) : undefined,
        reviewCount: reviewCount ? Number(reviewCount) : undefined,
        features: JSON.parse(features),
        isAvailable: isAvailable === 'true',
        freeShipping: freeShipping === 'true',
        shippingEstimate,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(error.message);
    }
  }
}
