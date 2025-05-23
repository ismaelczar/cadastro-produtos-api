import { AuthenticateUserResponse } from '@config/authenticated';
import { HttpResponse } from '@config/httpResponse';

import { AuthenticateUserService } from '@modules/users/services/SessionsService';

export class SessionsController {
  constructor(private readonly sessionsService: AuthenticateUserService) {}

  async login(
    email: string,
    password: string,
  ): Promise<HttpResponse<AuthenticateUserResponse>> {
    return this.sessionsService.execute(email, password);
  }
}
