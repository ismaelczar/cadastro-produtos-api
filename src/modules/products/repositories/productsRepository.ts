import { getRepository } from 'typeorm';
import { Product } from '../infra/typeorm/entities/products';
import { IProductsRepository } from './IProductsRepository';

export class ProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    return await getRepository(Product).find();
  }

  async create(product: Product): Promise<Product> {
    return getRepository(Product).create(product);
  }

  async update(product: Partial<Product>): Promise<Product> {
    return await getRepository(Product).save(product);
  }

  async remove(id: string): Promise<void> {
    await getRepository(Product).delete(id);
  }
}
