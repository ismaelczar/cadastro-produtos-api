import { Product } from '../infra/typeorm/entities/products';
import { IProductsRepository } from './protocols';

export class ProductsRepository implements IProductsRepository {
  async getProducts(): Promise<Product[]> {
    return [
      {
        name: 'Produto 1',
        price: 1.99,
        image: '',
        description: 'descrição teste',
      },
    ];
  }
}
