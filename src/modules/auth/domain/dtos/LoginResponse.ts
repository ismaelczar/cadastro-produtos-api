import { User } from '@modules/users/domain/entities/User';

export interface LoginResponse {
  user: Omit<User, 'password' & { acessToken: string }>;
  refreshToken: string;
}
