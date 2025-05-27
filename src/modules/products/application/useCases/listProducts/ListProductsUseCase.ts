import { HttpResponse } from '@shared/responses/httpResponse';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { Product } from '../../../domain/entities/products';

export class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(): Promise<HttpResponse<Product[]>> {
    try {
      const products = await this.productsRepository.findAll();
      return {
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
