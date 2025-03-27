interface Request {
  name: string;
  image?: string;
  price: number;
  description: string;
}

export class UpdateProductService {
  public execute({ name, image, price, description }: Request) {
    //TODO: Chamar repositório.
  }
}
