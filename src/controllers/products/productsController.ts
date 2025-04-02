import { HttpResponse } from '../../@types/httpResponse';
import { Product } from '../../models/products';
import { IProductsRepository } from '../../repositories/products/protocols';

import { IProductsController } from './protocols';

export class ProductsController implements IProductsController {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async list(): Promise<HttpResponse<Product[]>> {
    try {
      const products = await this.productsRepository.getProducts();

      return {
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
