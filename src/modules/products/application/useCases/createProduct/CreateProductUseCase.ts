import { CreateProductDTO } from '@modules/products/domain/dtos/CreateProductDTO';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(data: CreateProductDTO) {
    const product = {
      name: data.name,
      price: data.price,
      description: data.description,
      long_description: data.long_description,
      image_urls: data.image_urls,
      rating: data.rating,
      reviewCount: data.reviewCount,
      features: data.features,
      isAvailable: data.isAvailable,
      freeShipping: data.freeShipping,
      shippingEstimate: data.shippingEstimate,
    };

    return await this.productRepository.create(product);
  }
}
