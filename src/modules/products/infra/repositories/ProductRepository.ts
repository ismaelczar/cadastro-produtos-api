import { DataSource, Repository } from 'typeorm';
import { Product } from '@modules/products/domain/entities/products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProductRepository implements IProductRepository {
  ormRepo: Repository<Product>;

  constructor(@inject('DataSource') dataSource: DataSource) {
    this.ormRepo = dataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return await this.ormRepo.find();
  }

  async findById(id: string): Promise<Product> {
    return await this.ormRepo.findOne({
      where: { id: id },
    });
  }

  async create(product: Product): Promise<Product> {
    const newPoduct = this.ormRepo.create(product);

    await this.ormRepo.save(newPoduct);

    return newPoduct;
  }

  async update(product: Partial<Product>): Promise<Product> {
    return await this.ormRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
