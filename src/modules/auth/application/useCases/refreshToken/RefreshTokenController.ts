import { HttpResponse } from '@shared/responses/httpResponse';
import { RefreshTokenUseCase } from '@modules/auth/application/useCases/refreshToken/RefreshTokenUseCase';

interface Response {
  newAccessToken: string;
  newRefreshToken: string;
}

export class RefreshTokenController {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(refreshTokenUseCase: string): Promise<HttpResponse<Response>> {
    return this.refreshTokenUseCase.execute(refreshTokenUseCase);
  }
}
