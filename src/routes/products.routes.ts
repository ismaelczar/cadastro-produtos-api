import { Router } from 'express';
import { ProductsRepository } from '../repositories/products/productsRepository';
import { ProductsController } from '../controllers/products/productsController';

export const productsRoutes = Router();

productsRoutes.get('/', async (req, res): Promise<any> => {
  const productsRepository = new ProductsRepository();
  const productsController = new ProductsController(productsRepository);

  const { body, statusCode } = await productsController.list();

  return res.status(statusCode).json({
    status: 'sucess',
    data: body,
  });
});
