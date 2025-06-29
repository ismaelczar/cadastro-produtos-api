import 'reflect-metadata';
import { FakeProductRepository } from '@modules/products/infra/fakes/FakeProductRepository';
import { UpdateProductUseCase } from './UpdateProductUseCase';
import { Product } from '@modules/products/domain/entities/products';
import { AppError } from '@shared/core/errors/AppError';

describe('UpdateProduct', () => {
  let fakeProductRepository: FakeProductRepository;
  let updateProductUseCase: UpdateProductUseCase;
  let uuidFake: string;
  let product: Product;

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    updateProductUseCase = new UpdateProductUseCase(fakeProductRepository);
    uuidFake = 'df4e99f4-47e6-4649-9eae-a374f555f57f';
    product = {
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
      id: 'df4e99f4-47e6-4649-9eae-a374f555f57f',
    };
  });

  it('should be able to update a products', async () => {
    await fakeProductRepository.create(product);

    const result = await updateProductUseCase.execute(product, uuidFake);

    expect(result).toHaveProperty('name');
  });

  it('should throw if ID is not a valid UUID', async () => {
    await expect(
      updateProductUseCase.execute(product, 'invalid-id'),
    ).rejects.toEqual(new AppError('Invalid UUID', 400, 'validation'));
  });

  it('should throw if there is no product with the id', async () => {
    await expect(
      updateProductUseCase.execute(product, uuidFake),
    ).rejects.toEqual(
      new AppError('Provide a valid product', 400, 'validation'),
    );
  });
});
