import { Product } from '../../models/products';

export interface IProductsRepository {
  getProducts(): Promise<Product[]>;
}
