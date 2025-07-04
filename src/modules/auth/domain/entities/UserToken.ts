import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity('user_tokens')
export class UserToken {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @Generated('uuid')
  token: string;

  @Column({ type: 'varchar' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
