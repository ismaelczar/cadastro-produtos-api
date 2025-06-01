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
      image: data.image,
      description: data.description,
      long_description: data.long_description,
    };

    return await this.productRepository.create(product);
  }
}
