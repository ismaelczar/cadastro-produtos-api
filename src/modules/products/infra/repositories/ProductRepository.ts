import { getRepository } from 'typeorm';
import { Product } from '@modules/products/domain/entities/products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return await getRepository(Product).find();
  }

  async findById(id: string): Promise<Product> {
    return await getRepository(Product).findOne({
      where: { id: id },
    });
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
