import { HttpResponse } from '../@types/httpResponse';
import { User } from '../models/user';

import { AuthenticateUserService } from '../services/sessionsService';

export class SessionsController {
  constructor(private readonly sessionsService: AuthenticateUserService) {}

  async login(email: string, password: string): Promise<HttpResponse<User>> {
    return this.sessionsService.login(email, password);
  }
}
