import { HttpResponse } from '@config/httpResponse';
import { IProductsRepository } from '../repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/products';

export class ListProductsService {
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
