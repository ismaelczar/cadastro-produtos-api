import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
} from '../controllers/productsController';

export const productsRoutes = Router();

productsRoutes.get('/', getProducts).post('/', createProduct);
productsRoutes.put('/:id', updateProduct);
