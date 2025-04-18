import { HttpResponse } from '../../../../config/httpResponse';
import { User } from '../../../../modules/users/infra/typeorm/entities/user';

import { AuthenticateUserService } from '../../../../modules/users/services/sessionsService';

export class SessionsController {
  constructor(private readonly sessionsService: AuthenticateUserService) {}

  async login(email: string, password: string): Promise<HttpResponse<User>> {
    return this.sessionsService.login(email, password);
  }
}
