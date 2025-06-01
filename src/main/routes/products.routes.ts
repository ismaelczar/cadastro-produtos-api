import { Router } from 'express';
import { ListProductsController } from '@modules/products/application/useCases/listProducts/ListProductsController';

export const productsRouter = Router();

const listProductsController = new ListProductsController();

productsRouter.get('/', listProductsController.handle.bind);
