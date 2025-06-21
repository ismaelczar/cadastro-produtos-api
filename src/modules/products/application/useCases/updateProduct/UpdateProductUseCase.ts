import { UpdateProductDTO } from '@modules/products/domain/dtos/UpdateProductDTO';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { AppError } from '@shared/core/errors/AppError';
import { isUUID } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private readonly ormRepo: IProductRepository,
  ) {}

  async execute(data: UpdateProductDTO, id: string) {
    if (!isUUID(id)) {
      throw new AppError('Invalid UUID', 400, 'validation');
    }

    const product = await this.ormRepo.findById(id);

    if (!product) {
      throw new AppError('Provide a valid product', 400, 'validation');
    }

    const updateProduct: UpdateProductDTO = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      features: data.features,
      freeShipping: data.freeShipping,
      image_urls: data.image_urls,
      isAvailable: data.isAvailable,
      long_description: data.long_description,
      rating: data.rating,
      reviewCount: data.reviewCount,
      shippingEstimate: data.shippingEstimate,
    };

    return await this.ormRepo.update(updateProduct);
  }
}
