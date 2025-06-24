import 'reflect-metadata';
import { FakeProductRepository } from '@modules/products/domain/repositories/fakes/FakeProductRepository';
import { ListProductsUseCase } from './ListProductsUseCase';

describe('ListProducts', () => {
  let fakeRepositoryProducts: FakeProductRepository;
  let listProductsUseCase: ListProductsUseCase;

  beforeEach(() => {
    fakeRepositoryProducts = new FakeProductRepository();
    listProductsUseCase = new ListProductsUseCase(fakeRepositoryProducts);
  });

  it('should be able to return a list of products', async () => {
    const product = {
      name: 'Cadeira Gamer Ultimate',
      price: 1299.9,
      description: 'Conforto premium para longas sessões de jogo.',
      long_description: [
        'Encosto reclinável em até 180 graus.',
        'Estofado de couro sintético com espuma de alta densidade.',
        'Apoios de braço ajustáveis em 4 direções.',
      ],
      image_urls: [
        'https://exemplo.com/imagens/cadeira1.jpg',
        'https://exemplo.com/imagens/cadeira2.jpg',
      ],
      rating: 4.7,
      reviewCount: 132,
      features: [
        'Ajuste de altura pneumático',
        'Base reforçada de aço',
        'Rodas silenciosas',
      ],
      isAvailable: true,
      freeShipping: true,
      shippingEstimate: '3 a 5 dias úteis',
    };

    await fakeRepositoryProducts.create(product);
    await expect(listProductsUseCase.execute()).resolves.toBeInstanceOf(Array);
  });

  it('should throw internal error when product list is empty', async () => {
    await expect(listProductsUseCase.execute()).rejects.toMatchObject({
      message: 'Internal server error',
      statusCode: 500,
      type: 'infra',
    });
  });
});
