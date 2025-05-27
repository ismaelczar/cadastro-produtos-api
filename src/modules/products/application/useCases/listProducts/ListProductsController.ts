import { HttpResponse } from '@shared/responses/httpResponse';
import { Product } from '@modules/products/domain/entities/products';
import { ListProductsUseCase } from '@modules/products/application/useCases/listProducts/ListProductsUseCase';

export class ListProductsController {
  constructor(private readonly listProductsUseCase: ListProductsUseCase) {}

  async handler(): Promise<HttpResponse<Product[]>> {
    return this.listProductsUseCase.execute();
  }
}
