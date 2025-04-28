import { Product } from '../infra/typeorm/entities/products';

export interface IProductsRepository {
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  remove(id: string): Promise<void>;
}
