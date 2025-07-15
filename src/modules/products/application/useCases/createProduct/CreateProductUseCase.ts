import { CreateProductDTO } from '@modules/products/domain/dtos/CreateProductDTO';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IRedisProvider } from '@shared/providers/redis/IRedisProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository,

    @inject('IRedisProvider')
    private readonly redisProvider: IRedisProvider,
  ) {}

  async execute(data: CreateProductDTO, files: Express.Multer.File[]) {
    const image_urls: string[] = files?.map((file) => {
      return `http://localhost:3333/tmp/${file.filename}`;
    });

    const product = {
      name: data.name,
      price: Number(data.price),
      description: data.description,
      long_description: data.long_description,

      image_urls,
      rating: data.rating ? Number(data.rating) : undefined,
      reviewCount: data.reviewCount ? Number(data.reviewCount) : undefined,
      features: data.features,
      isAvailable: data.isAvailable ? true : false,
      freeShipping: data.freeShipping ? true : false,
      shippingEstimate: data.shippingEstimate,
    };

    await this.redisProvider.deleteChash('products-list');

    return await this.productRepository.create(product);
  }
}
