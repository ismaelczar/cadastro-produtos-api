import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumDescriptionInProductTable1748804283004
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'description',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'description');
  }
}
