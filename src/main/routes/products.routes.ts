import { Router } from 'express';
import { ListProductsController } from '@modules/products/application/useCases/listProducts/ListProductsController';
import { CreateProductController } from '@modules/products/application/useCases/createProduct/CreateProductController';
import { UpdatedProductController } from '@modules/products/application/useCases/updateProduct/UpdateProductController';
import { DeleteProductController } from '@modules/products/application/useCases/deleteProduct/DeleteProductController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import uploadConfig from '@shared/config/upload';
import multer from 'multer';

export const productsRouter = Router();
const upload = multer(uploadConfig);

const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();
const updateProductController = new UpdatedProductController();
const deleteProductController = new DeleteProductController();

productsRouter.get(
  '/',
  ensureAuthenticated,
  listProductsController.handle.bind(listProductsController),
);
productsRouter.post(
  '/',
  ensureAuthenticated,
  upload.array('images'),
  createProductController.handle.bind(createProductController),
);

productsRouter.put(
  '/:id',
  ensureAuthenticated,
  updateProductController.hande.bind(updateProductController),
);

productsRouter.delete(
  '/:id',
  ensureAuthenticated,
  deleteProductController.handle.bind(deleteProductController),
);
