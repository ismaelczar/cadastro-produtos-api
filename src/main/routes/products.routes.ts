import { Router } from 'express';
import { ListProductsController } from '@modules/products/application/useCases/listProducts/ListProductsController';
import { CreateProductController } from '@modules/products/application/useCases/createProduct/CreateProductController';
import { UpdatedProductController } from '@modules/products/application/useCases/updateProduct/UpdateProductController';

export const productsRouter = Router();

const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();
const updateProductController = new UpdatedProductController();

productsRouter.get(
  '/',
  listProductsController.handle.bind(listProductsController),
);
productsRouter.post(
  '/',
  createProductController.handle.bind(createProductController),
);

productsRouter.put(
  '/:id',
  updateProductController.hande.bind(updateProductController),
);
