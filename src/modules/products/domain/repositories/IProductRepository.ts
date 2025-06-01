import { Product } from '../entities/products';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(product: Partial<Product>): Promise<Product>;
  remove(id: string): Promise<void>;
}
