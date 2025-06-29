import 'reflect-metadata';
import { FakeProductRepository } from '@modules/products/infra/fakes/FakeProductRepository';
import { DeleteProductUseCase } from './DeleteProductUseCase';
import { AppError } from '@shared/core/errors/AppError';

describe('DeleteProduct', () => {
  let fakeProductRepository: FakeProductRepository;
  let deleteProductUseCase: DeleteProductUseCase;
  let uuidFake: string;

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    deleteProductUseCase = new DeleteProductUseCase(fakeProductRepository);
    uuidFake = 'df4e99f4-47e6-4649-9eae-a374f555f57f';
  });

  it('should be able to remove a product', async () => {
    const fakeproductData = {
      id: 'df4e99f4-47e6-4649-9eae-a374f555f57f',
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

    const createProduct = await fakeProductRepository.create(fakeproductData);

    await deleteProductUseCase.execute(createProduct.id);

    const result = await fakeProductRepository.findById(createProduct.id);

    expect(result).toBeNull();
  });

  it('should throw if ID is not a valid UUID', async () => {
    await expect(deleteProductUseCase.execute('invalid-id')).rejects.toEqual(
      new AppError('Invalid UUID', 400, 'validation'),
    );
  });

  it('should throw if ID is not a valid one', async () => {
    await expect(deleteProductUseCase.execute(uuidFake)).rejects.toThrow(
      'Provide a valid product',
    );
  });
});
