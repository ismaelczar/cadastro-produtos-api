import { Router } from 'express';
import { ProductsRepository } from '@modules/products/infra/repositories/ProductsRepository';
import { ListProductsUseCase } from '@modules/products/application/useCases/listProducts/ListProductsUseCase';
import { ListProductsController } from '@modules/products/application/useCases/listProducts/ListProductsController';

const productsRepository = new ProductsRepository();
const listProductsUseCase = new ListProductsUseCase(productsRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

export const productsRouter = Router();

productsRouter.get('/', async (req, res): Promise<any> => {
  const { statusCode, body } = await listProductsController.handler();

  return res.status(statusCode).json({
    data: body,
  });
});
