import { Product } from '@modules/products/domain/entities/products';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { AppError } from '@shared/core/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    return products;
  }
}
