import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/productsController';

export const productsRoutes = Router();

productsRoutes.get('/', getProducts);
productsRoutes.post('/', createProduct);
