import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar' })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at?: Date;

  @Column({ type: 'boolean' })
  role?: boolean;
}
