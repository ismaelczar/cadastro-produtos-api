import { LoginResponse } from '@modules/auth/domain/dtos/LoginResponse';
import { HttpResponse } from '@shared/responses/httpResponse';

import { LoginUserCase } from '@modules/auth/application/useCases/login/LoginUseCase';

export class LoginController {
  constructor(private readonly loginUserCase: LoginUserCase) {}

  async handle(
    email: string,
    password: string,
  ): Promise<HttpResponse<LoginResponse>> {
    return this.loginUserCase.execute(email, password);
  }
}
