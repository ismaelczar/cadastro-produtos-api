import { Product } from '../entities/products';

export interface IProductsRepository {
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(product: Partial<Product>): Promise<Product>;
  remove(id: string): Promise<void>;
}
