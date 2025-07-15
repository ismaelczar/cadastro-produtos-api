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
    let products = await this.redisProvider.get<Product[]>('products-list');

    if (!products) {
      products = await this.productRepository.findAll();
      await this.redisProvider.setChash(
        'products-list',
        JSON.stringify(products),
        60 * 60 * 24,
      );
    }

    return products;
  }
}
