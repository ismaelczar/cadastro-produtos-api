import { Product } from '../entities/products';

export interface IProductsRepository {
  getProducts(): Promise<Product[]>;
}
