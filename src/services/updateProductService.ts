interface Request {
  id: string;
  name: string;
  image?: string;
  price: number;
  description: string;
}

interface Response {
  product: {
    name: string;
    image?: string;
    price: number;
    description: string;
  };
}

export class UpdateProductService {
  public execute({ id, name, image, price, description }: Request): Response {
    //REPOSITORIO.

    const productIndex = repositorio.find((item) => item.id === id);

    if (!productIndex) {
      throw new Error('Invalid product');
    }

    const product = {
      name: name,
      image: image,
      price: price,
      description: description,
    };

    //SALVAR O NOVO PRODUTO AO BANCO.

    return { product };
  }
}
