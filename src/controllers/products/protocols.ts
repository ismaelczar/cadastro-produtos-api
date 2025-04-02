import { Product } from '../../models/products';
import { HttpResponse } from '../protocols';

export interface IProductsController {
  list(): Promise<HttpResponse<Product[]>>;
}
