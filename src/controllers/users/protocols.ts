import { HttpResponse } from '../../@types/httpResponse';
import { User } from '../../models/user';

export interface IUserController {
  list(): Promise<HttpResponse<User[]>>;

  create({
    fristName,
    lastName,
    email,
    password,
  }: User): Promise<HttpResponse<User>>;
}
