import { Router } from 'express';
import { ListProductsController } from '@modules/products/application/useCases/listProducts/ListProductsController';
import { CreateProductController } from '@modules/products/application/useCases/createProduct/CreateProductController';

export const productsRouter = Router();

const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();

productsRouter.get(
  '/',
  listProductsController.handle.bind(listProductsController),
);
productsRouter.post(
  '/',
  createProductController.handle.bind(createProductController),
);
