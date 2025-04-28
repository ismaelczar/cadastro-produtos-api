import { Product } from '../infra/typeorm/entities/products';

export interface IProductsRepository {
  getProducts(): Promise<Product[]>;
}
