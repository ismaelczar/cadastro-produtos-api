import { User } from '@modules/users/infra/typeorm/entities/user';

export interface AuthenticateUserResponse {
  user: Omit<User, 'password' & { acessToken: string }>;
  refreshToken: string;
}
