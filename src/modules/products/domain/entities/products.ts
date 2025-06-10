import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column('json', { nullable: true })
  long_description?: string[];

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ name: 'review_count', type: 'int', default: 0 })
  reviewCount: number;

  @Column('json', { nullable: true })
  features?: string[];

  @Column('text', { array: true, nullable: true })
  image_urls?: string[];

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ name: 'free_shipping', type: 'boolean', default: false })
  freeShipping: boolean;

  @Column({ type: 'varchar', name: 'shipping_estimate', nullable: true })
  shippingEstimate?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt?: Date;
}
