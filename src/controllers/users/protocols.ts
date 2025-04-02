import { HttpResponse } from '../../@types/httpResponse';
import { Product } from '../../models/products';

export interface IUserController {
  list(): Promise<HttpResponse<Product[]>>;

  create(): any;
}
