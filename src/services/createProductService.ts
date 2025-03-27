interface Request {
  name: string;
  image?: string;
  price: number;
  description: string;
}

interface Response {
  product: {
    name: string;
    image: string;
    price: number;
    description: string;
  };
}

export class CreateProductService {
  public execute({ name, image, price, description }: Request): Response {
    //TODO: Adicionar repositório.

    if (!name) {
      throw new Error('Name, price, and description are required');
    }

    const product = {
      name,
      image: image || '',
      price,
      description,
    };

    //TODO: Salvar no repositório.

    return { product };
  }
}
