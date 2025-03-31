import { CreateProductService } from '../services/createProductService';
import { UpdateProductService } from '../services/updateProductService';

export const getProducts = (req, res) => {
  return res.status(200).json({
    status: 'success',
    result: '',
    data: {
      products: 'List products',
    },
  });
};

export const createProduct = (req, res) => {
  try {
    const productData = req.body;
    const createProductService = new CreateProductService();
    const { product } = createProductService.execute(productData);

    return res.status(201).json({
      status: 'success',
      data: {
        produtc: product,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const updateProduct = (req, res) => {
  try {
    const id = req.params.id;
    const productData = Object.assign({ id }, req.body);

    const updateProducService = new UpdateProductService();
    const { product } = updateProducService.execute(productData);

    return res.status(200).json({
      status: 'sucess',
      data: {
        product: product,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
