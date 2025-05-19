import { HttpResponse } from '@config/httpResponse';
import { Product } from '@modules/products/infra/typeorm/entities/products';
import { ListProductsService } from '@modules/products/services/listProductsService';

export class ProductsController {
  constructor(private readonly listProductsService: ListProductsService) {}

  async getProducts(): Promise<HttpResponse<Product[]>> {
    return this.listProductsService.execute();
  }
}
