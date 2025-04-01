import { User } from '../../models/user';
import { HttpResponse } from '../protocols';

export interface IGetUsersController {
  hangle(): Promise<HttpResponse<User[]>>;
}
