import { getRepository } from 'typeorm';
import { Product } from '../infra/typeorm/entities/products';
import { IProductsRepository } from './protocols';

export class ProductsRepository implements IProductsRepository {
  //TODO: CRIAR UMA UNICA INSTANCIA DO REPOSITORIO.
  async findAll(): Promise<Product[]> {
    const ormRepository = getRepository(Product);
    const products = await ormRepository.find();

    return products;
  }

  async create(productData: Product): Promise<Product> {
    const ormRepository = getRepository(Product);

    const product = productData;

    ormRepository.create(productData);

    return product;
  }

  async remove(id: string): Promise<void> {
    const ormRepository = getRepository(Product);
    await ormRepository.delete(id);
  }

  async update(product: Partial<Product>): Promise<Product> {
    const ormRepository = getRepository(Product);

    const updatedProduct = await ormRepository.save(product);

    return updatedProduct;
  }
}
