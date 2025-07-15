import 'reflect-metadata';
import { FakeProductRepository } from '@modules/products/infra/fakes/FakeProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase';
import { RedisProvider } from '@shared/providers/redis/RedisProvider';

let fakeProductRepository: FakeProductRepository;
let createProductUseCase: CreateProductUseCase;
let redisProvider: RedisProvider;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    redisProvider = new RedisProvider();
    createProductUseCase = new CreateProductUseCase(
      fakeProductRepository,
      redisProvider,
    );
  });

  it('should be able to create a new product', async () => {
    const productData = {
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

    const result = await createProductUseCase.execute(productData, []);

    expect(result).toHaveProperty('description');
    expect(result.name).toBe(productData.name);
    expect(result.price).toBe(productData.price);
  });
});
