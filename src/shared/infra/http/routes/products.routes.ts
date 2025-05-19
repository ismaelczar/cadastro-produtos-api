import { ProductsRepository } from '@modules/products/repositories/productsRepository';
import { ListProductsService } from '@modules/products/services/listProductsService';
import { Router, Request, Response } from 'express';
import { ProductsController } from '../controllers/productsController';

const productsRepository = new ProductsRepository();
const listProductsService = new ListProductsService(productsRepository);
const productsController = new ProductsController(listProductsService);

export const productsRouter = Router();

productsRouter.get('/', async (req, res): Promise<any> => {
  const { statusCode, body } = await productsController.getProducts();

  return res.status(statusCode).json({
    data: body,
  });
});
