import { Router } from 'express';
import { ListProductsController } from '@modules/products/application/useCases/listProducts/ListProductsController';
import { CreateProductController } from '@modules/products/application/useCases/createProduct/CreateProductController';
import { UpdatedProductController } from '@modules/products/application/useCases/updateProduct/UpdateProductController';
import { DeleteProductController } from '@modules/products/application/useCases/deleteProduct/DeleteProductController';
import { ensureAuthenticated } from 'main/http/middlewares/ensureAuthenticated';
import uploadConfig from '@main/http/middlewares/uploadMiddleware';
import multer from 'multer';
import { param } from 'express-validator';
import { validate } from 'main/http/middlewares/handleValidationErrors';
import { ValidationErrors } from '@shared/core/errors/messages';
import { createProductValidation } from '@modules/products/infra/http/validations/createProductValidation';

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
  createProductValidation,
  createProductController.handle.bind(createProductController),
);

productsRouter.put(
  '/:id',
  ensureAuthenticated,
  updateProductController.hande.bind(updateProductController),
);

productsRouter.delete(
  '/:id',
  [
    param('id')
      .notEmpty()
      .withMessage(ValidationErrors.ID_REQUIRED)
      .isUUID()
      .withMessage(ValidationErrors.ID_INVALID),
    validate,
  ],
  ensureAuthenticated,

  deleteProductController.handle.bind(deleteProductController),
);
