import { Product } from '@modules/products/domain/entities/products';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IRedisProvider } from '@shared/providers/redis/IRedisProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository,

    @inject('IRedisProvider')
    private readonly redisProvider: IRedisProvider,
  ) {}

  async execute(): Promise<Product[]> {
    let products = await this.redisProvider.revocer<Product[]>('products-list');

    if (!products) {
      products = await this.productRepository.findAll();
      await this.redisProvider.save('products-list', JSON.stringify(products));
    }

    return products;
  }
}
