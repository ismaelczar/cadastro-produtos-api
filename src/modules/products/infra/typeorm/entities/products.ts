import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  price: number;

  @Column({ type: 'varchar' })
  image?: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column('simple-array', { nullable: true })
  long_description?: string[]; // <-- Array de descrições longas

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at?: Date;
}
