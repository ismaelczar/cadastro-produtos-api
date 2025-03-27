import { CreateProductService } from '../services/createProductService';

export const getProducts = (req, res) => {
  return res.status(200).json({
    status: 'success',
    // result: 'result'
    data: {
      products: 'List products',
    },
  });
};

export const createProduct = (req, res) => {
  try {
    const productData = req.body;
    const createProduct = new CreateProductService();
    const { product } = createProduct.execute(productData);

    return res.status(201).json({
      status: 'success',
      data: {
        produtc: product,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// export const updateProduct = (req, res) => {
//   const productData = req.body;

//   return res.status(200).json({
//     status: 'sucess',
//     data: {
//       product,
//     },
//   });
// };
