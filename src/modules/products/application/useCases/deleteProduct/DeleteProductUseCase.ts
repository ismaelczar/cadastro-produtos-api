import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { AppError } from '@shared/core/errors/AppError';
import { isUUID } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject('ProductRepository') private readonly ormRepo: IProductRepository,
  ) {}

  async execute(id: string) {
    if (!isUUID(id)) {
      throw new AppError('Invalid UUID', 400, 'validation');
    }

    const product = await this.ormRepo.findById(id);

    if (!product) {
      throw new AppError('Provide a valid product', 400, 'validation');
    }

    return await this.ormRepo.remove(id);
  }
}
