import { User } from '@modules/users/domain/entities/user';

export interface LoginResponse {
  user: Omit<User, 'password' & { acessToken: string }>;
  refreshToken: string;
}
