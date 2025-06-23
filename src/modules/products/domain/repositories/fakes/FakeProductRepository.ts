import { Product } from '../../entities/products';
import { IProductRepository } from '../IProductRepository';

export class FakeProductRepository implements IProductRepository {
  private products: Product[] = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) || null;
  }

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async update(product: Product): Promise<Product> {
    const productIndex = this.products.findIndex((u) => u.id === product.id);

    this.products[productIndex] = product;

    return product;
  }

  async remove(id: string): Promise<void> {
    const productIndex = this.products.findIndex((u) => u.id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }
  }
}
