import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnsAndRemoveImageFromProducts1748902855885
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove a coluna antiga 'image'
    await queryRunner.dropColumn('products', 'image');

    // Adiciona as novas colunas
    await queryRunner.addColumns('products', [
      new TableColumn({
        name: 'rating',
        type: 'decimal',
        precision: 2,
        scale: 1,
        default: 0,
      }),
      new TableColumn({
        name: 'review_count',
        type: 'int',
        default: 0,
      }),
      new TableColumn({
        name: 'features',
        type: 'json',
        isNullable: true,
      }),
      new TableColumn({
        name: 'image_urls',
        type: 'text',
        isArray: true,
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_available',
        type: 'boolean',
        default: true,
      }),
      new TableColumn({
        name: 'free_shipping',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'shipping_estimate',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove as colunas adicionadas
    await queryRunner.dropColumn('products', 'shipping_estimate');
    await queryRunner.dropColumn('products', 'free_shipping');
    await queryRunner.dropColumn('products', 'is_available');
    await queryRunner.dropColumn('products', 'image_urls');
    await queryRunner.dropColumn('products', 'features');
    await queryRunner.dropColumn('products', 'review_count');
    await queryRunner.dropColumn('products', 'rating');

    // Restaura a coluna 'image'
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
