import { HttpResponse } from '@config/httpResponse';
import { RefreshTokenService } from '@modules/users/services/RefreshTokenService';

interface Response {
  newAccessToken: string;
  newRefreshToken: string;
}

export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  async handle(refreshToken: string): Promise<HttpResponse<Response>> {
    return this.refreshTokenService.execute(refreshToken);
  }
}
