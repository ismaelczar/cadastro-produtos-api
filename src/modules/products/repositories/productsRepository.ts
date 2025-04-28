import { getRepository } from 'typeorm';
import { Product } from '../infra/typeorm/entities/products';
import { IProductsRepository } from './protocols';

export class ProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    return getRepository(Product).find();
  }

  async create(productData: Product): Promise<Product> {
    const product = getRepository(Product).create(productData);
    return await getRepository(Product).save(product);
  }

  async remove(id: string): Promise<void> {
    await getRepository(Product).delete(id);
  }

  async update(product: Partial<Product>): Promise<Product> {
    return await getRepository(Product).save(product);
  }
}
